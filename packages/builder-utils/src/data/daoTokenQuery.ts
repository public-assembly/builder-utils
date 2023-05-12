import gql from 'graphql-tag'

export const DAO_TOKEN_QUERY = gql`
  query NounishTokens($chain: Chain!, $tokenAddress: String!, $tokenId: String!) {
    token(
      token: { address: $tokenAddress, tokenId: $tokenId }
      network: { network: ETHEREUM, chain: $chain }
    ) {
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
