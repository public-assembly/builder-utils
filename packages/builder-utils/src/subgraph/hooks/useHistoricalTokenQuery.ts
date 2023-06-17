import { Hex } from 'viem'
import useSWR from 'swr'
import { fetcher } from '../fetcher'
import { HISTORICAL_TOKEN_QUERY } from '../queries/historicalToken'
import { HistoricalTokenQueryVariables } from '../types/graphql'

export function useHistoricalTokenQuery({
  tokenAddress,
  tokenId,
}: {
  tokenAddress: Hex
  tokenId: BigInt
}) {
  const { data: historicalToken, error } = useSWR(
    `historicalToken-${tokenAddress}-${tokenId}`,
    () =>
      fetcher(HISTORICAL_TOKEN_QUERY, {
        id: tokenAddress,
        tokenId: tokenId,
      } as HistoricalTokenQueryVariables)
  )

  return { historicalToken, error }
}
