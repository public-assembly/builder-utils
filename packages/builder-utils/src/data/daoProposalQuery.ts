import gql from 'graphql-tag'

export const DAO_PROPOSAL_QUERY = gql`
  query NounishProposals($chain: Chain!, $tokenAddress: [String!]) {
    nouns {
      nounsProposals(
        where: { collectionAddresses: $tokenAddress }
        networks: { network: ETHEREUM, chain: $chain }
        sort: { sortDirection: DESC, sortKey: CREATED }
        pagination: { limit: 500 }
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
          networkInfo {
            chain
            network
          }
          proposalId
          proposalNumber
          proposalThreshold
          proposer
          quorumVotes
          status
          targets
          timeCreated
          title
          transactionInfo {
            blockNumber
            blockTimestamp
            transactionHash
          }
          treasury
          values
          voteEnd
          voteStart
          votes {
            proposalId
            reason
            support
            transactionInfo {
              blockNumber
              blockTimestamp
              transactionHash
            }
            voter
            weight
          }
        }
      }
    }
  }
`
