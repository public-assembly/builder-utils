import { client } from './client'
import { DocumentNode } from 'graphql'
import {
  AuctionConfigQueryVariables,
  CurrentAuctionQueryVariables,
  DaoAddressesQueryVariables,
  DaoProposalsQueryVariables,
  HistoricalAuctionQueryVariables,
  HistoricalTokenQueryVariables,
  ProposalDetailsQueryVariables,
  ProposalVotesQueryVariables,
} from './types/graphql'

type FetcherVariablesProps =
  | AuctionConfigQueryVariables
  | CurrentAuctionQueryVariables
  | DaoAddressesQueryVariables
  | DaoProposalsQueryVariables
  | HistoricalAuctionQueryVariables
  | HistoricalTokenQueryVariables
  | ProposalDetailsQueryVariables
  | ProposalVotesQueryVariables

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
