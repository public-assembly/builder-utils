import { DocumentNode } from 'graphql'
import { GraphQLClient } from 'graphql-request'
import {
  NounishAuctionsQueryVariables,
  NounishCollectionsQueryVariables,
  NounishProposalsQueryVariables,
  NounishTokensQueryVariables,
} from '../graphql'
import { CHAIN } from '../graphql/constants/chain'

export const client = new GraphQLClient('https://api.zora.co/graphql', {
  method: 'POST',
  headers: new Headers({
    'Content-Type': 'application/json',
    ...(!!process.env.NEXT_PUBLIC_ZORA_API_KEY && {
      'X-API-KEY': process.env.NEXT_PUBLIC_ZORA_API_KEY,
      'X-ENABLE-NOUNS': 'true',
    }),
  }),
  mode: 'no-cors',
})

type ZoraApiFetcherVariablesProps =
  | NounishAuctionsQueryVariables
  | NounishCollectionsQueryVariables
  | NounishProposalsQueryVariables
  | NounishTokensQueryVariables

export async function zoraApiFetcher(
  query: DocumentNode,
  providedVariables?: ZoraApiFetcherVariablesProps
) {
  let variables = {
    networks: {
      network: 'ETHEREUM',
      chain: CHAIN,
    },
    ...providedVariables,
  }
  try {
    const response = await client.request(query, variables)
    return response
  } catch (err) {
    console.error(err)
  }
}
