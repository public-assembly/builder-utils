import React, { useContext } from 'react'
import type { PropsWithChildren } from 'react'
import { useManagerContext } from './ManagerProvider'
import { useDaoProposalsQuery } from '../subgraph'
import { Proposal } from '../subgraph/types/graphql'
import { Hex } from 'viem'

export interface GovernorReturnTypes {
  tokenAddress: Hex
  governorAddress: Hex
  daoProposals: Proposal[]
}

const GovernorContext = React.createContext({} as GovernorReturnTypes)

export function GovernorProvider({ children }: PropsWithChildren) {
  const { tokenAddress, governorAddress } = useManagerContext()

  const { daoProposals } = useDaoProposalsQuery({ tokenAddress: tokenAddress })

  return (
    <GovernorContext.Provider
      value={{
        tokenAddress,
        governorAddress: governorAddress as Hex,
        daoProposals: daoProposals as Proposal[],
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
