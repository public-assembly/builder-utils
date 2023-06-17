import { client } from './client'
import { Fetcher } from 'swr'
import { TypedDocumentNode } from '@graphql-typed-document-node/core'

/**
 * The key defined in the invoking hook is, by default, passed to fetcher
 */
export const fetcher: Fetcher = async (
  query: TypedDocumentNode,
  providedVariables?: any
) => {
  let variables = { ...providedVariables }
  try {
    const response = await client.request(query, variables)
    return response
  } catch (err) {
    console.error(err)
  }
}
