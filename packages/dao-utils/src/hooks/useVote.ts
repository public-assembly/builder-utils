import type { HexString } from '../types'
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import { governorAbi } from '../abi'
import { BigNumber } from 'ethers'
import { useGovernorContext } from '../context'

interface VotingFunctions {
  castVote?: () => void
  castVoteLoading?: boolean
  castVoteSuccess?: boolean
  castVoteWithReason?: () => void
  castVoteWithReasonLoading?: boolean
  castVoteWithReasonSuccess?: boolean
}

interface VoteProps {
  proposal: any
  support?: number
  reason?: string
}

export function useVote({ proposal, support, reason }: VoteProps): VotingFunctions {
  const { governorAddress } = useGovernorContext()

  const { config: castVoteConfig } = usePrepareContractWrite(
    support !== undefined
      ? {
          address: governorAddress,
          abi: governorAbi,
          functionName: 'castVote',
          args: [proposal.proposalId as HexString, BigNumber.from(support)],
        }
      : undefined
  )
  const { data: castVoteData, write: castVote } = useContractWrite(castVoteConfig)

  const { isLoading: castVoteLoading, isSuccess: castVoteSuccess } =
    useWaitForTransaction({
      hash: castVoteData?.hash,
    })

  const { config: castVoteWithReasonConfig } = usePrepareContractWrite(
    support !== undefined
      ? {
          address: governorAddress,
          abi: governorAbi,
          functionName: 'castVoteWithReason',
          args: [
            proposal.proposalId as HexString,
            BigNumber.from(support),
            reason as string,
          ],
        }
      : undefined
  )
  const { data: castVoteWithReasonData, write: castVoteWithReason } = useContractWrite(
    castVoteWithReasonConfig
  )

  const { isLoading: castVoteWithReasonLoading, isSuccess: castVoteWithReasonSuccess } =
    useWaitForTransaction({
      hash: castVoteWithReasonData?.hash,
    })

  return {
    castVote,
    castVoteLoading,
    castVoteSuccess,
    castVoteWithReason,
    castVoteWithReasonLoading,
    castVoteWithReasonSuccess,
  }
}
