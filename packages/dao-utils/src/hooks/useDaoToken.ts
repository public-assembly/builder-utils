/* @ts-ignore */
import * as React from 'react'
import useSWR from 'swr'
import { DAO_TOKEN_QUERY } from '../data/daoTokenQuery'
import { zoraApiFetcher } from '../lib/zoraApiFetcher'

export type TokenData = {
  lastRefreshTime: string
  /**
   * ETH Wallet address of token holder
   */
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

export function useDaoToken({
  daoAddress,
  tokenId,
}: {
  daoAddress: string
  tokenId: string
}) {
  const { data: tokenData, error } = useSWR<any>(
    `token-metadata-${daoAddress}-${tokenId}`,
    async () =>
      zoraApiFetcher(DAO_TOKEN_QUERY, {
        daoAddress,
        tokenId,
      }),
    {
      refreshInterval: 5000,
    }
  )

  return {
    tokenData: tokenData?.token?.token as TokenData,
    error,
  }
}
