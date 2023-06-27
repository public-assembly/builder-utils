import { Hex } from 'viem'
import useSWR from 'swr'
import { fetcher } from '../fetcher'
import { HISTORICAL_TOKEN_QUERY } from '../queries/historicalToken'
import { HistoricalTokenQuery, HistoricalTokenQueryVariables } from '../types/graphql'
import { useEnsNameOrShorten } from '../../hooks'
import { formatFromUnix } from '../../lib'

export function useHistoricalTokenQuery({
  tokenAddress,
  tokenId,
}: {
  tokenAddress: Hex
  tokenId: BigInt
}) {
  const { data: historicalToken, error } = useSWR<HistoricalTokenQuery>(
    `historicalToken-${tokenAddress}-${tokenId}`,
    () =>
      fetcher(HISTORICAL_TOKEN_QUERY, {
        id: tokenAddress,
        tokenId: tokenId.toString(),
      } as HistoricalTokenQueryVariables)
  )

  const tokenOwner = useEnsNameOrShorten({
    address: historicalToken?.dao?.tokens[0]?.owner,
  })

  return {
    tokenId: historicalToken?.dao?.tokens[0]?.tokenId,
    tokenName: historicalToken?.dao?.tokens[0]?.name,
    tokenImage: historicalToken?.dao?.tokens[0]?.image,
    tokenOwner: tokenOwner,
    mintedAt: formatFromUnix({ timestamp: historicalToken?.dao?.tokens[0]?.mintedAt }),
    mintedAtRaw: historicalToken?.dao?.tokens[0]?.mintedAt,
    error,
  }
}
