import { graphql } from '../types'

export const CURRENT_AUCTION_QUERY = graphql(`
  query CurrentAuction($id: ID!) {
    dao(id: $id) {
      id
      currentAuction {
        tokenId
        startTime
        endTime
        extended
        settled
        winningBid {
          amount
          bidder
        }
        highestBid {
          amount
          bidder
        }
      }
    }
  }
`)
