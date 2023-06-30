import { graphql } from '../types'

export const PROPOSAL_DETAILS_QUERY = graphql(`
  query ProposalDetails($proposalId: ID!) {
    proposal(id: $proposalId) {
      abstainVotes
      againstVotes
      calldatas
      canceled
      description
      descriptionHash
      executableFrom
      executed
      expiresAt
      forVotes
      proposalId
      proposalNumber
      proposalThreshold
      proposer
      queued
      quorumVotes
      targets
      timeCreated
      title
      values
      vetoed
      voteCount
      voteEnd
      voteStart
      snapshotBlockNumber
      transactionHash
      dao {
        governorAddress
        tokenAddress
      }
      votes {
        reason
        support
        voter
        weight
      }
    }
  }
`)
