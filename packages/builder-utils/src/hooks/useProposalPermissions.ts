import { governorAbi } from '../abi'
import { useGovernorContext } from '../context'
import { useState } from 'react'
import { Hex, Hash } from 'viem'
import { useAccount, useContractReads } from 'wagmi'

export function useProposalPermissions({
  proposalId,
  timeCreated,
}: {
  proposalId: Hash
  timeCreated: bigint
}) {
  const { governorAddress } = useGovernorContext()
  const { address } = useAccount()
  const [canVeto, setCanVeto] = useState<boolean>(false)
  const [canCancel, setCanCancel] = useState<boolean>(false)
  const [canVote, setCanVote] = useState<boolean>(false)

  const governorContract = {
    address: governorAddress,
    abi: governorAbi,
  }

  useContractReads({
    contracts: [
      {
        ...governorContract,
        functionName: 'vetoer',
      },
      {
        ...governorContract,
        functionName: 'getProposal',
        args: [proposalId],
      },
      {
        ...governorContract,
        functionName: 'getVotes',
        args: [address as Hex, timeCreated],
      },
    ],
    onSuccess(proposalPermissions) {
      if (proposalPermissions[0].result === address) {
        setCanVeto(true)
      }

      if (proposalPermissions[1].result?.proposer === address) {
        setCanCancel(true)
      }

      if (Number(proposalPermissions[2].result) > 0) {
        setCanVote(true)
      }
    },
  })

  return {
    canVeto,
    canCancel,
    canVote,
  }
}
