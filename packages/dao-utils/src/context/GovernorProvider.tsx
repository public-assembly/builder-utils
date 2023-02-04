import React, { useContext } from 'react'
import { useContractRead } from 'wagmi'
import { governorAbi } from '../abi'
import { useManagerContext } from './ManagerProvider'
import { useDaoProposalQuery } from '../hooks'
import type { Hash, GovernorProviderProps, GovernorReturnTypes } from '../types'

const GovernorContext = React.createContext({} as GovernorReturnTypes)

export function GovernorProvider({ children, proposalId }: GovernorProviderProps) {
  const { tokenAddress, daoAddresses } = useManagerContext()

  const governorAddress = React.useMemo(
    () => daoAddresses?.governorAddress as Hash,
    [daoAddresses]
  )

  const { proposals } = useDaoProposalQuery({ tokenAddress: tokenAddress })

  /**
   * Returns a Proposal's details given a proposal id
   */
  const { data: getProposal } = useContractRead({
    address: governorAddress,
    abi: governorAbi,
    functionName: 'getProposal',
    args: [proposalId],
  })

  const proposalDetails = React.useMemo(() => {
    return {
      proposer: getProposal?.proposer,
      timeCreated: getProposal?.timeCreated,
      againstVotes: getProposal?.againstVotes,
      forVotes: getProposal?.forVotes,
      abstainVotes: getProposal?.abstainVotes,
      voteStart: getProposal?.voteStart,
      voteEnd: getProposal?.voteEnd,
      proposalThreshold: getProposal?.proposalThreshold,
      quorumVotes: getProposal?.quorumVotes,
      executed: getProposal?.executed,
      canceled: getProposal?.canceled,
      vetoed: getProposal?.vetoed,
    }
  }, [getProposal])

  return (
    <GovernorContext.Provider
      value={{
        tokenAddress,
        governorAddress,
        proposals,
        proposalId,
        proposalDetails,
      }}>
      {children}
    </GovernorContext.Provider>
  )
}

// Access the context value of the GovernorProvider
export function useGovernorContext() {
  const context = useContext(GovernorContext)
  if (!context) {
    throw Error('useGovernorContext hook must be used within a GovernorProvider')
  }
  return context
}
