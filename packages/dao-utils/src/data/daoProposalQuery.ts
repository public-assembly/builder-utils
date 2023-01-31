import gql from 'graphql-tag'

export const DAO_PROPOSAL_QUERY = gql`
  query NounishProposals($tokenAddress: [String!]) {
    nouns {
      nounsProposals(
        where: { collectionAddresses: $tokenAddress }
        sort: { sortDirection: DESC, sortKey: CREATED }
      ) {
        nodes {
          abstainVotes
          againstVotes
          auction
          calldatas
          collectionAddress
          description
          descriptionHash
          executableFrom
          expiresAt
          forVotes
          governor
          manager
          metadata
          proposalId
          proposalNumber
          proposalThreshold
          proposer
          quorumVotes
          status
          targets
          timeCreated
          title
          treasury
          values
          voteEnd
          voteStart
          votes {
            proposalId
            reason
            support
            voter
            weight
          }
        }
      }
    }
  }
`
