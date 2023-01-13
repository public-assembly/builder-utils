import * as React from 'react'
import { useContractRead } from 'wagmi'
import { governorAbi } from '../abi/governorAbi'
import { useManagerProvider } from './ManagerProvider'

export interface GovernorProviderProps {
  children?: React.ReactNode
  proposalId?: string
}

export interface GovernorReturnTypes {
  tokenAddress?: string
  governorAddress?: string
  proposalId?: string
  proposalDetails?: {
    proposer: string
    timeCreated: number
    againstVotes: number
    forVotes: number
    abstainVotes: number
    voteStart: number
    voteEnd: number
    proposalThreshold: number
    quorumVotes: number
    executed: boolean
    canceled: boolean
    vetoed: boolean
  }
}

const GovernorContext = React.createContext({} as GovernorReturnTypes)

export function GovernorProvider({ children, proposalId }: GovernorProviderProps) {
  const {
    tokenAddress,
    daoAddresses: { governorAddress },
  } = useManagerProvider()

  const { data: getProposal } = useContractRead({
    addressOrName: governorAddress as string,
    contractInterface: governorAbi,
    functionName: 'getProposal',
    args: [proposalId],
  })

  console.log(getProposal)

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
      value={{ tokenAddress, governorAddress, proposalId, proposalDetails }}>
      {children}
    </GovernorContext.Provider>
  )
}

// Access the context value of the GovernorProvider
export function useGovernorProvider() {
  return React.useContext(GovernorContext)
}
