import { Hex } from 'viem'
import useSWR from 'swr'
import { fetcher } from '../fetcher'
import { AUCTION_CONFIG_QUERY } from '../queries/auctionConfig'
import { AuctionConfigQueryVariables } from '../types/graphql'

export function useAuctionConfigQuery({ tokenAddress }: { tokenAddress: Hex }) {
  const { data: auctionConfig, error } = useSWR(`auctionConfig-${tokenAddress}`, () =>
    fetcher(AUCTION_CONFIG_QUERY, { id: tokenAddress } as AuctionConfigQueryVariables)
  )

  return { auctionConfig, error }
}
