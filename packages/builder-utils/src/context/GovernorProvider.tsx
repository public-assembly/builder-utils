import React, { useContext } from 'react'
import { useManagerContext } from './ManagerProvider'
import { useDaoProposalQuery } from '../hooks'
import type { HexString, GovernorProviderProps, GovernorReturnTypes } from '../types'

const GovernorContext = React.createContext({} as GovernorReturnTypes)

export function GovernorProvider({ children }: GovernorProviderProps) {
  const { tokenAddress, daoAddresses } = useManagerContext()

  const governorAddress = React.useMemo(
    () => daoAddresses?.governorAddress as HexString,
    [daoAddresses]
  )

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
