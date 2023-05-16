import gql from 'graphql-tag'

export const DAO_AUCTION_QUERY = gql`
  query NounishAuctions($chain: Chain!, $tokenAddress: String!) {
    nouns {
      nounsActiveMarket(
        where: { collectionAddress: $tokenAddress }
        network: { network: ETHEREUM, chain: $chain }
      ) {
        duration
        endTime
        highestBidder
        metadata
        status
        tokenId
        winner
        highestBidPrice {
          chainTokenPrice {
            decimal
            raw
          }
          usdcPrice {
            decimal
            raw
          }
        }
        reservePrice {
          chainTokenPrice {
            decimal
            raw
          }
        }
        startTime
        timeBuffer
        treasury
        extended
        firstBidTime
        estimatedDurationTime
        auction
        minBidIncrementPercentage
        address
      }
    }
  }
`
