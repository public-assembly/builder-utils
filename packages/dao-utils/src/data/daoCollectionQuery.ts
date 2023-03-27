import gql from 'graphql-tag'

export const DAO_COLLECTION_QUERY = gql`
  query NounishCollections($chain: Chain!, $tokenAddress: [String!]) {
    aggregateStat {
      nftCount(
        where: { collectionAddresses: $tokenAddress }
        networks: { network: ETHEREUM, chain: $chain }
      )
      ownerCount(
        where: { collectionAddresses: $tokenAddress }
        networks: { network: ETHEREUM, chain: $chain }
      )
    }
  }
`
