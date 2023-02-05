import type { Hash } from '../types'
import { usePrepareContractWrite, useContractWrite } from 'wagmi'
import { governorAbi } from '../abi'
import { BigNumber } from 'ethers'

interface VoteProps {
  governorAddress: Hash
  proposalId: Hash
  support: BigNumber
  reason: string
}

export function useVote({ governorAddress, proposalId, support, reason }: VoteProps) {
  const { config: castVoteConfig, error: castVoteError } = usePrepareContractWrite({
    address: governorAddress,
    abi: governorAbi,
    functionName: 'castVote',
    args: [proposalId, support],
  })
  const { write: castVote } = useContractWrite(castVoteConfig)

  const { config: castVoteWithReasonConfig, error: castVoteWithReasonError } =
    usePrepareContractWrite({
      address: governorAddress,
      abi: governorAbi,
      functionName: 'castVoteWithReason',
      args: [proposalId, support, reason],
    })
  const { write: castVoteWithReason } = useContractWrite(castVoteWithReasonConfig)

  return {
    castVote,
    castVoteWithReason,
    castVoteError,
    castVoteWithReasonError,
  }
}