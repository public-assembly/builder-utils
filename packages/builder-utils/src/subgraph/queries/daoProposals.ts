import { graphql } from '../types'

export const DAO_PROPOSALS_QUERY = graphql(`
  query DaoProposals($id: ID!) {
    dao(id: $id) {
      proposals(orderDirection: desc, orderBy: timeCreated) {
        id
      }
    }
  }
`)
