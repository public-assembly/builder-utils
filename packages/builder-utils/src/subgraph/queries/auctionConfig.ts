import { graphql } from '../types'

export const AUCTION_CONFIG_QUERY = graphql(`
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
`)
