/* @ts-ignore */
import useSWR from 'swr'
import { DAO_COLLECTION_QUERY } from '../data/daoCollectionQuery'
import { zoraApiFetcher } from '../lib/zoraApiFetcher'
import type { HexString } from '../types'

export function useDaoCollectionQuery({ tokenAddress }: { tokenAddress?: HexString }) {
  const { data: aggregateStat, error } = useSWR({ tokenAddress }, async () =>
    zoraApiFetcher(DAO_COLLECTION_QUERY, {
      tokenAddress,
    })
  )

  return {
    nftCount: aggregateStat?.nftCount,
    ownerCount: aggregateStat?.ownerCount,
    error,
  }
}
