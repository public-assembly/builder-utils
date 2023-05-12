/* @ts-ignore */
import * as React from 'react'
import useSWR from 'swr'
import { DAO_TOKEN_QUERY } from '../data/daoTokenQuery'
import { zoraApiFetcher } from '../lib/zoraApiFetcher'
import { NounishTokensQuery, NounishTokensQueryVariables } from '../types'
import { CHAIN } from '../constants/chain'
import { HexString } from '../types'

export type TokenData = {
  lastRefreshTime: string
  owner: string
  /**
   * Token Metadata Object
   */
  metadata: {
    description: string
    image: string
    name: string
    /**
     * Properties may be undefined, otherwise denotes the layer variants of the image.
     */
    properties: {}[]
  }
  mintInfo: {
    mintContext: {
      blockNumber: number
    }
  }
}

export function useDaoTokenQuery({
  tokenAddress,
  tokenId,
}: {
  tokenAddress: HexString
  tokenId: string
}) {
  const { data: tokenData, error } = useSWR<NounishTokensQuery>(
    `token-metadata-${tokenAddress}-${tokenId}`,
    async () =>
      zoraApiFetcher(DAO_TOKEN_QUERY, {
        tokenAddress,
        tokenId,
        chain: CHAIN,
      } as NounishTokensQueryVariables)
  )

  return {
    tokenData: tokenData?.token?.token as TokenData,
    error,
  }
}
