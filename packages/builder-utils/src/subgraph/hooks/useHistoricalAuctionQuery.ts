import { Hex } from 'viem'
import useSWR from 'swr'
import { fetcher } from '../fetcher'
import { HISTORICAL_AUCTION_QUERY } from '../queries/historicalAuction'
import { HistoricalAuctionQueryVariables } from '../types/graphql'

export function useHistoricalAuctionQuery({
  tokenAddress,
  tokenId,
}: {
  tokenAddress: Hex
  tokenId: BigInt
}) {
  const { data: historicalAuction, error } = useSWR(
    `historicalAuction-${tokenAddress}-${tokenId}`,
    () =>
      fetcher(HISTORICAL_AUCTION_QUERY, {
        id: tokenAddress,
        tokenId: tokenId,
      }) as HistoricalAuctionQueryVariables
  )

  return { historicalAuction, error }
}
