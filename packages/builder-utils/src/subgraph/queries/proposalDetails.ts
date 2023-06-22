import { graphql } from '../types'

export const PROPOSAL_DETAILS_QUERY = graphql(`
  query ProposalDetails($proposalId: ID!) {
    proposal(id: $proposalId) {
      abstainVotes
      againstVotes
      calldatas
      description
      descriptionHash
      executableFrom
      expiresAt
      forVotes
      proposalId
      proposalNumber
      proposalThreshold
      proposer
      quorumVotes
      targets
      timeCreated
      title
      values
      voteEnd
      voteStart
      snapshotBlockNumber
      transactionHash
      dao {
        governorAddress
        tokenAddress
      }
    }
  }
`)
