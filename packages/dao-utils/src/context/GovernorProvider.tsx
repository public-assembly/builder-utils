import React, { useContext } from 'react'
import { useManagerContext } from '@context/index'
import { useDaoProposalQuery } from '@hooks/index'
import type { HexString, GovernorProviderProps, GovernorReturnTypes } from '../types'

const GovernorContext = React.createContext({} as GovernorReturnTypes)

export function GovernorProvider({ children }: GovernorProviderProps) {
  const { tokenAddress, daoAddresses } = useManagerContext()

  const governorAddress = React.useMemo(
    () => daoAddresses?.governorAddress as HexString,
    [daoAddresses]
  )

  /**
   * Returns all proposals given a DAO's token address
   */
  const { proposals } = useDaoProposalQuery({ tokenAddress: tokenAddress })

  return (
    <GovernorContext.Provider
      value={{
        tokenAddress,
        governorAddress,
        proposals,
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
