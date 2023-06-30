import { graphql } from '../types'

export const DAO_PROPOSALS_QUERY = graphql(`
  query DaoProposals($id: ID!) {
    dao(id: $id) {
      proposals(orderDirection: desc, orderBy: timeCreated) {
        id
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
  }
`)
