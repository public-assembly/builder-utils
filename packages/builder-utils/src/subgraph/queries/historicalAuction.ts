import gql from 'graphql-tag'

export const HISTORICAL_AUCTION_QUERY = gql`
  query HistoricalAuction($id: ID!, $tokenId: BigInt) {
    dao(id: $id) {
      id
      auctions(where: { tokenId: $tokenId }) {
        startTime
        endTime
        extended
        winningBid {
          amount
          bidder
        }
        settled
        tokenId
        highestBid {
          bidder
          amount
        }
        bids {
          bidder
          amount
        }
      }
    }
  }
`
