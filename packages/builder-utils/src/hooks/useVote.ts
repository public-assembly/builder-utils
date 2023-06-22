import type { Hex } from 'viem'
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import { governorAbi } from '../abi'
import { useGovernorContext } from '../context'
import { Proposal } from '../subgraph/types/graphql'

interface VotingFunctions {
  castVote?: () => void
  castVoteLoading?: boolean
  castVoteSuccess?: boolean
  castVoteWithReason?: () => void
  castVoteWithReasonLoading?: boolean
  castVoteWithReasonSuccess?: boolean
}

interface VoteProps {
  proposal: Proposal
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
          args: [proposal.proposalId as Hex, BigInt(support)],
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
          args: [proposal.proposalId as Hex, BigInt(support), reason as string],
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
