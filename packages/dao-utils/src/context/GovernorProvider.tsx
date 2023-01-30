import React, { useContext } from 'react'
import { useContractRead, useContract } from 'wagmi'
import { governorAbi } from '../abi/governorAbi'
import { useManagerContext } from './ManagerProvider'

type Hash = `0x${string}`

export interface GovernorProviderProps {
  children?: React.ReactNode
  proposalId: `0x${string}`
}

/**
 * https://github.com/ourzora/nouns-protocol/blob/1dbccbf9b82d34cba0b3ecc0b4feaef96909a5e6/src/governance/governor/IGovernor.sol#L19
 */
export type Proposal = {
  proposalId: `0x${string}`[]
  targets: `0x${string}`[]
  values: number[]
  calldatas: `0x${string}`[]
  description: string
  descriptionHash: `0x${string}`
  proposal: ProposalDetails
  state: number
}

/**
 * https://github.com/ourzora/nouns-protocol/blob/main/src/governance/governor/types/GovernorTypesV1.sol#L42
 */
export type ProposalDetails = {
  proposer?: `0x${string}`
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

export type ProposalState = {
  pending: boolean
  active: boolean
  canceled: boolean
  defeated: boolean
  succeeded: boolean
  queued: boolean
  expired: boolean
  executed: boolean
  vetoed: boolean
} | null

export interface GovernorReturnTypes {
  tokenAddress?: Hash
  governorAddress: Hash
  proposalId: Hash
  proposalDetails: ProposalDetails
  proposalArray?: Proposal[]
}

const GovernorContext = React.createContext({} as GovernorReturnTypes)

export function GovernorProvider({ children, proposalId }: GovernorProviderProps) {
  const { tokenAddress, daoAddresses } = useManagerContext()

  const governorAddress = React.useMemo(
    () => daoAddresses?.governorAddress as Hash,
    [daoAddresses]
  )

  const [proposalArray, setProposalArray] = React.useState<Proposal[]>()

  /**
   * Create a type-safe Contract instance
   */
  const governorContract = useContract({
    address: governorAddress,
    abi: governorAbi,
  })

  /**
   * Used to query Proposal creation events as defined below:
   * https://github.com/ourzora/nouns-protocol/blob/main/src/governance/governor/IGovernor.sol#L18-L27
   */
  async function getProposals() {
    try {
      const proposalCreationEvents = await governorContract?.queryFilter(
        'ProposalCreated' as any,
        7400416,
        'latest'
      )
      if (proposalCreationEvents) {
        const proposalEventsArray = proposalCreationEvents.map((event: any) => {
          return {
            proposalId: event?.proposalId,
            targets: event?.targets,
            values: event?.values,
            calldatas: event?.calldatas,
            description: event?.description,
            descriptionHash: event?.description,
            proposal: event?.proposal,
          }
        }) as Proposal[]
        setProposalArray(proposalEventsArray)
      }
    } catch (err) {
      console.error(err)
    }
  }

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
        proposalArray,
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
