import { governorAbi } from '../abi'
import { Hash, Hex } from 'viem'
import { readContract } from 'wagmi/actions'

export enum ProposalState {
  Pending = 0,
  Active = 1,
  Canceled = 2,
  Defeated = 3,
  Succeeded = 4,
  Queued = 5,
  Expired = 6,
  Executed = 7,
  Vetoed = 8,
}

export const getProposalState = async (governorAddress: Hex, proposalId: Hash) => {
  return (await readContract({
    address: governorAddress,
    abi: governorAbi,
    functionName: 'state',
    args: [proposalId],
  })) as ProposalState
}

export const getStatefulProposals = async (daoProposals, governorAddress) => {
  const statefulProposals = await Promise.all(
    daoProposals.map(async (proposal) => {
      const state = await getProposalState(governorAddress, proposal.id)
      return { ...proposal, state }
    })
  )

  return statefulProposals
}
