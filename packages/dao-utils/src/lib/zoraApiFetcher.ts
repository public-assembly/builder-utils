import { DocumentNode } from 'graphql'
import { GraphQLClient } from 'graphql-request'

export const client = new GraphQLClient('https://api.zora.co/graphql', {
  method: 'POST',
  headers: new Headers({
    'Content-Type': 'application/json',
    // 'X-API-KEY': process.env.NEXT_PUBLIC_ZORA_API_KEY!,
    'X-ENABLE-NOUNS': 'true',
  }),
  mode: 'no-cors',
})

export async function zoraApiFetcher(query: DocumentNode, providedVariables?: any) {
  let variables = {
    network: { chain: 'MAINNET', network: 'ETHEREUM' },
    ...providedVariables,
  }
  try {
    const response = await client.request(query, variables)
    return response
  } catch (err) {
    console.error(err)
  }
}
