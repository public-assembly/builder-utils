/* @ts-ignore */
import * as React from 'react'
import useSWR from 'swr'
import { DAO_AUCTION_QUERY } from '../data/daoAuctionQuery'
import { zoraApiFetcher } from '../lib/zoraApiFetcher'
import { HexString, NounishAuctionsQuery, NounishAuctionsQueryVariables } from '../types'
import { CHAIN } from '../constants/chain'

export function useDaoAuctionQuery({ tokenAddress }: { tokenAddress: HexString }) {
  const { data: activeAuction, error } = useSWR<NounishAuctionsQuery>(
    `auction-${tokenAddress}`,
    async () =>
      zoraApiFetcher(DAO_AUCTION_QUERY, {
        tokenAddress,
        chain: CHAIN,
      } as NounishAuctionsQueryVariables)
  )

  return {
    activeAuction: activeAuction?.nouns?.nounsActiveMarket,
    error,
  }
}
