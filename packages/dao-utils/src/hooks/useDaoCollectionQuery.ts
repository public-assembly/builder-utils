/* @ts-ignore */
import useSWR from 'swr'
import { DAO_COLLECTION_QUERY } from '../data/daoCollectionQuery'
import { zoraApiFetcher } from '../lib/zoraApiFetcher'
import {
  HexString,
  Chain,
  NounishCollectionsQuery,
  NounishCollectionsQueryVariables,
} from '../types'

export const CHAIN = {
  1: Chain.Mainnet,
  5: Chain.Goerli,
}[process.env.NEXT_PUBLIC_CHAIN_ID || 1] as Chain

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
