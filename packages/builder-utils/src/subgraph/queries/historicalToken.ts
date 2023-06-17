import gql from 'graphql-tag'

export const HISTORICAL_TOKEN_QUERY = gql`
  query HistoricalToken($id: ID!, $tokenId: BigInt!) {
    dao(id: $id) {
      id
      tokens(where: { tokenId: $tokenId }) {
        tokenId
        name
        owner
        mintedAt
        image
      }
    }
  }
`
