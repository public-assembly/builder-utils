import gql from 'graphql-tag'

export const DAO_TOKEN_QUERY = gql`
  query NounishAuctions($daoAddress: String!, $tokenId: String!) {
    token(token: { address: $daoAddress, tokenId: $tokenId }) {
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
