import { GraphQLClient } from 'graphql-request'
import { PUBLIC_SUBGRAPH_URL } from '../subgraph/subgraph'

export const client = new GraphQLClient(PUBLIC_SUBGRAPH_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
})
