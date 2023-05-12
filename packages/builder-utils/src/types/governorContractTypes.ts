import { NounsProposal } from '.'
import { Hex } from './misc'

export interface GovernorProviderProps {
  children?: React.ReactNode
}

export interface GovernorReturnTypes {
  tokenAddress?: Hex
  governorAddress: Hex
  proposals?: NounsProposal[]
}

/**
 * https://github.com/ourzora/nouns-protocol/blob/1dbccbf9b82d34cba0b3ecc0b4feaef96909a5e6/src/governance/governor/IGovernor.sol#L19
 */
export type Proposal = {
  proposalId: Hex[]
  targets: Hex[]
  values: number[]
  calldatas: Hex[]
  description: string
  descriptionHexString: Hex
  proposal: ProposalDetails
  state: number
}

/**
 * https://github.com/ourzora/nouns-protocol/blob/main/src/governance/governor/types/GovernorTypesV1.sol#L42
 */
export type ProposalDetails = {
  proposer?: Hex
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
