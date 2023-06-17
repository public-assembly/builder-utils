import gql from 'graphql-tag'

export const AUCTION_CONFIG_QUERY = gql`
  query AuctionConfig($id: ID!) {
    dao(id: $id) {
      id
      auctionConfig {
        minimumBidIncrement
        reservePrice
        timeBuffer
        duration
      }
    }
  }
`
