import React, { useContext } from 'react'
import { useContractRead } from 'wagmi'
import { governorAbi } from '../abi'
import { useManagerContext } from './ManagerProvider'
import { useDaoProposalQuery, useVote } from '../hooks'
import type { Hash, GovernorProviderProps, GovernorReturnTypes } from '../types'

const GovernorContext = React.createContext({} as GovernorReturnTypes)

export function GovernorProvider({
  children,
  proposalId,
  support,
  reason,
}: GovernorProviderProps) {
  const { tokenAddress, daoAddresses } = useManagerContext()

  const governorAddress = React.useMemo(
    () => daoAddresses?.governorAddress as Hash,
    [daoAddresses]
  )

  /**
   * Returns all proposals given a DAO's token address
   */
  const { proposals } = useDaoProposalQuery({ tokenAddress: tokenAddress })

  const { castVote, castVoteWithReason } = useVote({
    governorAddress: governorAddress,
    proposalId,
    support,
    reason,
  })

  return (
    <GovernorContext.Provider
      value={{
        tokenAddress,
        governorAddress,
        proposals,
        proposalId,
        castVote,
        castVoteWithReason,
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
