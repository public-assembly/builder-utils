import gql from 'graphql-tag'

export const DAO_ADDRESSES_QUERY = gql`
  query DaoAddresses($id: ID!) {
    dao(id: $id) {
      id
      treasuryAddress
      auctionAddress
      governorAddress
      metadataAddress
    }
  }
`
