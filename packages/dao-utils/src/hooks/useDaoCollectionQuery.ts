/* @ts-ignore */
import * as React from 'react'
import useSWR from 'swr'
import { DAO_COLLECTION_QUERY } from '../data/daoCollectionQuery'
import { zoraApiFetcher } from '../lib/zoraApiFetcher'
import {
  HexString,
  NounishCollectionsQuery,
  NounishCollectionsQueryVariables,
} from '../types'
import { CHAIN } from '../constants/chain'

export function useDaoCollectionQuery({ tokenAddress }: { tokenAddress?: HexString }) {
  const { data: aggregateStat, error } = useSWR<NounishCollectionsQuery>(
    { tokenAddress, chain: CHAIN },
    async () =>
      zoraApiFetcher(DAO_COLLECTION_QUERY, {
        tokenAddress,
        chain: CHAIN,
      } as NounishCollectionsQueryVariables)
  )
  return {
    nftCount: aggregateStat?.aggregateStat?.nftCount,
    ownerCount: aggregateStat?.aggregateStat?.ownerCount,
    error,
  }
}
