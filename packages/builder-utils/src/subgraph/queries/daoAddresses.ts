import { graphql } from '../types'

export const DAO_ADDRESSES_QUERY = graphql(`
  query DaoAddresses($id: ID!) {
    dao(id: $id) {
      id
      treasuryAddress
      auctionAddress
      governorAddress
      metadataAddress
    }
  }
`)
