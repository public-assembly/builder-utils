import { graphql } from '../types'

export const DAO_DETAILS_QUERY = graphql(`
  query DaoDetails($id: ID!) {
    dao(id: $id) {
      name
      symbol
      description
      contractImage
      projectURI
      ownerCount
      totalSupply
      totalAuctionSales
      proposalCount
    }
  }
`)
