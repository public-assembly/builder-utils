import gql from 'graphql-tag'

export const CURRENT_AUCTION_QUERY = gql`
  query CurrentAuction($id: ID!) {
    dao(id: $id) {
      id
      currentAuction {
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
          amount
          bidder
        }
      }
    }
  }
`
