import { type Hash } from 'viem'
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import { governorAbi } from '../abi'
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
  proposalId: Hash
  support?: number
  reason?: string
}

export function useVote({ proposalId, support, reason }: VoteProps): VotingFunctions {
  const { governorAddress } = useGovernorContext()

  const { config: castVoteConfig } = usePrepareContractWrite(
    support !== undefined
      ? {
          address: governorAddress,
          abi: governorAbi,
          functionName: 'castVote',
          args: [proposalId, BigInt(support)],
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
          args: [proposalId, BigInt(support), reason as string],
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
