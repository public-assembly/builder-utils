import { NounsProposal } from '.'
import { HexString } from './hexStringType'

export interface GovernorProviderProps {
  children?: React.ReactNode
}

export interface GovernorReturnTypes {
  tokenAddress?: HexString
  governorAddress: HexString
  proposals?: NounsProposal[]
}

/**
 * https://github.com/ourzora/nouns-protocol/blob/1dbccbf9b82d34cba0b3ecc0b4feaef96909a5e6/src/governance/governor/IGovernor.sol#L19
 */
export type Proposal = {
  proposalId: HexString[]
  targets: HexString[]
  values: number[]
  calldatas: HexString[]
  description: string
  descriptionHexString: HexString
  proposal: ProposalDetails
  state: number
}

/**
 * https://github.com/ourzora/nouns-protocol/blob/main/src/governance/governor/types/GovernorTypesV1.sol#L42
 */
export type ProposalDetails = {
  proposer?: HexString
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
