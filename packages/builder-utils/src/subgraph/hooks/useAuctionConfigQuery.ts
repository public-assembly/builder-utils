import { Hex } from 'viem'
import useSWR from 'swr'
import { fetcher } from '../fetcher'
import { AUCTION_CONFIG_QUERY } from '../queries/auctionConfig'
import { AuctionConfigQuery, AuctionConfigQueryVariables } from '../types/graphql'

export function useAuctionConfigQuery({ tokenAddress }: { tokenAddress: Hex }) {
  const { data: auctionConfig, error } = useSWR<AuctionConfigQuery>(
    `auctionConfig-${tokenAddress}`,
    () =>
      fetcher(AUCTION_CONFIG_QUERY, { id: tokenAddress } as AuctionConfigQueryVariables)
  )

  return {
    minimumBidIncrement: auctionConfig?.dao?.auctionConfig.minimumBidIncrement,
    reservePrice: auctionConfig?.dao?.auctionConfig.reservePrice,
    duration: auctionConfig?.dao?.auctionConfig.duration,
    timeBuffer: auctionConfig?.dao?.auctionConfig.timeBuffer,
    error,
  }
}
