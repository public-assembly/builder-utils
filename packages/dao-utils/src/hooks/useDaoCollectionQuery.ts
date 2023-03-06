/* @ts-ignore */
import useSWR from 'swr'
import { DAO_COLLECTION_QUERY } from '../data/daoCollectionQuery'
import { zoraApiFetcher } from '../lib/zoraApiFetcher'
import type { HexString, NounishCollectionsQuery } from '../types'

export function useDaoCollectionQuery({ tokenAddress }: { tokenAddress?: HexString }) {
  const { data: aggregateStat, error } = useSWR<NounishCollectionsQuery>(
    { tokenAddress },
    async () =>
      zoraApiFetcher(DAO_COLLECTION_QUERY, {
        tokenAddress,
      })
  )

  return {
    nftCount: aggregateStat?.aggregateStat.nftCount,
    ownerCount: aggregateStat?.aggregateStat.ownerCount,
    error,
  }
}
