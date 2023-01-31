import React, { useContext } from 'react'
import { useContractRead, useContract } from 'wagmi'
import { governorAbi } from '../abi'
import { useManagerContext } from './ManagerProvider'

type Hash = `0x${string}`

export interface GovernorProviderProps {
  children?: React.ReactNode
  proposalId: Hash
}

/**
 * https://github.com/ourzora/nouns-protocol/blob/1dbccbf9b82d34cba0b3ecc0b4feaef96909a5e6/src/governance/governor/IGovernor.sol#L19
 */
export type Proposal = {
  proposalId: Hash[]
  targets: Hash[]
  values: number[]
  calldatas: Hash[]
  description: string
  descriptionHash: Hash
  proposal: ProposalDetails
  state: number
}

/**
 * https://github.com/ourzora/nouns-protocol/blob/main/src/governance/governor/types/GovernorTypesV1.sol#L42
 */
export type ProposalDetails = {
  proposer?: Hash
  timeCreated?: number
  againstVotes?: number
  forVotes?: number
  abstainVotes?: number
  voteStart?: number
  voteEnd?: number
  proposalThreshold?: number
  quorumVotes?: number
  executed?: boolean
  canceled?: boolean
  vetoed?: boolean
}

export interface GovernorReturnTypes {
  tokenAddress?: Hash
  governorAddress: Hash
  proposalId: Hash
  proposalDetails: ProposalDetails
}

const GovernorContext = React.createContext({} as GovernorReturnTypes)

export function GovernorProvider({ children, proposalId }: GovernorProviderProps) {
  const { tokenAddress, daoAddresses } = useManagerContext()

  const governorAddress = React.useMemo(
    () => daoAddresses?.governorAddress as Hash,
    [daoAddresses]
  )

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
