import { graphql } from '../types'

export const HISTORICAL_TOKEN_QUERY = graphql(`
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
`)
