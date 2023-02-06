import type { HexString } from '../types'
import { usePrepareContractWrite, useContractWrite } from 'wagmi'
import { governorAbi } from '../abi'
import { BigNumber } from 'ethers'
import { useGovernorContext } from '../context'

interface VoteProps {
  support?: number
  reason?: string
}

export function useVote({ support, reason }: VoteProps) {
  const { governorAddress, proposals } = useGovernorContext()

  const { config: castVoteConfig, error: castVoteError } = usePrepareContractWrite(
    support !== undefined
      ? {
          address: governorAddress,
          abi: governorAbi,
          functionName: 'castVote',
          args: [proposals?.proposalId as HexString, BigNumber.from(support)],
        }
      : undefined
  )
  const { write: castVote } = useContractWrite(castVoteConfig)

  const { config: castVoteWithReasonConfig, error: castVoteWithReasonError } =
    usePrepareContractWrite(
      support !== undefined
        ? {
            address: governorAddress,
            abi: governorAbi,
            functionName: 'castVoteWithReason',
            args: [
              proposals?.proposalId as HexString,
              BigNumber.from(support),
              reason as string,
            ],
          }
        : undefined
    )
  const { write: castVoteWithReason } = useContractWrite(castVoteWithReasonConfig)

  return {
    castVote,
    castVoteWithReason,
    castVoteError,
    castVoteWithReasonError,
  }
}
