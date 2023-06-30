import React, { useContext, useEffect, useState } from 'react'
import type { PropsWithChildren } from 'react'
import { useManagerContext } from './ManagerProvider'
import { useDaoProposalsQuery } from '../subgraph'
import { Proposal } from '../subgraph/types/graphql'
import { Hex } from 'viem'
import { getStatefulProposals } from '../lib/getProposalState'

export type StatefulProposal = Omit<Proposal, '__typename'> & {
  state: string
}

export interface GovernorReturnTypes {
  tokenAddress: Hex
  governorAddress: Hex
  proposals: StatefulProposal[]
}

const GovernorContext = React.createContext({} as GovernorReturnTypes)

export function GovernorProvider({ children }: PropsWithChildren) {
  const { tokenAddress, governorAddress } = useManagerContext()
  const [proposals, setProposals] = useState<StatefulProposal[] | undefined>()

  const { daoProposals } = useDaoProposalsQuery({ tokenAddress: tokenAddress })

  useEffect(() => {
    if (!daoProposals) return
    // prettier-ignore
    (async () => {
      setProposals(await getStatefulProposals(daoProposals, governorAddress as Hex))
    })()
  }, [daoProposals])

  return (
    <GovernorContext.Provider
      value={{
        tokenAddress,
        governorAddress: governorAddress as Hex,
        proposals: proposals as StatefulProposal[],
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
