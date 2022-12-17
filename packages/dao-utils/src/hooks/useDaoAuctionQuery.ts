/* @ts-ignore */
import * as React from 'react'
import useSWR from 'swr'
import { NounishAuctionsQuery } from '../types/zora.api.generated'
import { DAO_AUCTION_QUERY } from '../data/daoAuctionQuery'
import { zoraApiFetcher } from '../lib/zoraApiFetcher'

export function useDaoAuctionQuery({ collectionAddress }: { collectionAddress: string }) {
  const { data: activeAuction, error } = useSWR<NounishAuctionsQuery>(
    `pa-auction-${collectionAddress}`,
    async () =>
      zoraApiFetcher(DAO_AUCTION_QUERY, {
        collectionAddress,
      })
  )

  return {
    activeAuction: activeAuction?.nouns?.nounsActiveMarket,
    error,
  }
}
