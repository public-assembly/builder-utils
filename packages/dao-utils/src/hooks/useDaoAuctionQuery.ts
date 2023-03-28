/* @ts-ignore */
import * as React from 'react'
import useSWR from 'swr'
import { DAO_AUCTION_QUERY } from '../data/daoAuctionQuery'
import { zoraApiFetcher } from '../lib/zoraApiFetcher'
import {
  HexString,
  Chain,
  NounishAuctionsQuery,
  NounishAuctionsQueryVariables,
} from '../types'

export const CHAIN = {
  1: Chain.Mainnet,
  5: Chain.Goerli,
}[process.env.NEXT_PUBLIC_CHAIN_ID || 1] as Chain

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
