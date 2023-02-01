export type Hash = `0x${string}`

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
  /**
   * TODO: Update typings
   */
  proposals: any
  proposalId: Hash
  proposalDetails: ProposalDetails
}
