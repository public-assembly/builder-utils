import gql from 'graphql-tag'

export const DAO_COLLECTION_QUERY = gql`
  query NounishCollections($tokenAddress: [String!]) {
    aggregateStat {
      nftCount(where: { collectionAddresses: $tokenAddress })
      ownerCount(where: { collectionAddresses: $tokenAddress })
    }
  }
`
