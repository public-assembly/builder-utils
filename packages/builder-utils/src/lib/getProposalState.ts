import { governorAbi } from '../abi'
import { Hash, Hex } from 'viem'
import { readContract } from 'wagmi/actions'

export const ProposalState = {
  0: 'Pending',
  1: 'Active',
  2: 'Canceled',
  3: 'Defeated',
  4: 'Succeeded',
  5: 'Queued',
  6: 'Expired',
  7: 'Executed',
  8: 'Vetoed',
}

export const getProposalState = async (governorAddress: Hex, proposalId: Hash) => {
  return await readContract({
    address: governorAddress,
    abi: governorAbi,
    functionName: 'state',
    args: [proposalId],
  })
}

export const getStatefulProposals = async (daoProposals, governorAddress: Hex) => {
  const statefulProposals = await Promise.all(
    daoProposals.map(async (proposal) => {
      const state = await getProposalState(governorAddress, proposal.id)
      const stateString = ProposalState[state] // Access the string value from the ProposalState object
      return { ...proposal, state: stateString }
    })
  )

  return statefulProposals
}
