import { graphql } from '../types'

export const CURRENT_AUCTION_QUERY = graphql(`
  query CurrentAuction($id: ID!) {
    dao(id: $id) {
      currentAuction {
        token {
          tokenId
        }
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
        token {
          tokenId
        }
      }
    }
  }
`)
