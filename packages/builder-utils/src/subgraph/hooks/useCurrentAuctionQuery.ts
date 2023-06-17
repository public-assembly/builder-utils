import { Hex } from 'viem'
import useSWR from 'swr'
import { fetcher } from '../fetcher'
import { CURRENT_AUCTION_QUERY } from '../queries/currentAuction'
import { CurrentAuctionQueryVariables } from '../types/graphql'

export function useCurrentAuctionQuery({ tokenAddress }: { tokenAddress: Hex }) {
  const { data: currentAuction, error } = useSWR(`currentAuction-${tokenAddress}`, () =>
    fetcher(CURRENT_AUCTION_QUERY, { id: tokenAddress } as CurrentAuctionQueryVariables)
  )

  return { currentAuction, error }
}
