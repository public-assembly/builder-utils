import { graphql } from '../types'

export const HISTORICAL_AUCTION_QUERY = graphql(`
  query HistoricalAuction($id: ID!, $tokenId: BigInt!) {
    dao(id: $id) {
      tokens(where: { tokenId: $tokenId }) {
        tokenId
        auction {
          startTime
          endTime
          extended
          winningBid {
            amount
            bidder
          }
          settled
          bids(orderBy: amount, orderDirection: desc) {
            bidder
            amount
          }
        }
      }
    }
  }
`)
