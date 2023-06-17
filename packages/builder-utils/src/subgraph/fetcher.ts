import { client } from './client'
import { Fetcher } from 'swr'
import { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { DocumentNode } from 'graphql'
import {
  AuctionConfigQueryVariables,
  CurrentAuctionQueryVariables,
  DaoAddressesQueryVariables,
  HistoricalAuctionQueryVariables,
  HistoricalTokenQueryVariables,
} from './types/graphql'

type FetcherVariablesProps =
  | AuctionConfigQueryVariables
  | CurrentAuctionQueryVariables
  | DaoAddressesQueryVariables
  | HistoricalAuctionQueryVariables
  | HistoricalTokenQueryVariables

/**
 * The key defined in the invoking hook is, by default, passed to fetcher
 */
export const fetcher = async (
  query: DocumentNode,
  providedVariables?: FetcherVariablesProps
) => {
  let variables = { ...providedVariables }
  try {
    const response = await client.request(query, variables)
    return response
  } catch (err) {
    console.error(err)
  }
}
