import gql from 'graphql-tag'

export const DAO_TOKEN_QUERY = gql`
  query NounishTokens($tokenAddress: String!, $tokenId: String!) {
    token(token: { address: $tokenAddress, tokenId: $tokenId }) {
      token {
        metadata
        owner
        lastRefreshTime
        mintInfo {
          mintContext {
            blockNumber
          }
        }
      }
    }
  }
`
