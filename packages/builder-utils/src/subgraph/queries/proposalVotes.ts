import { graphql } from '../types'

export const PROPOSAL_VOTES_QUERY = graphql(`
  query ProposalVotes($proposalId: ID!) {
    proposal(id: $proposalId) {
      votes {
        reason
        support
        voter
        weight
      }
    }
  }
`)
