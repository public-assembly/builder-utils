/* @ts-ignore */
import * as React from 'react'
import { useDaoToken } from '../hooks/useDaoToken'
import { useBidder } from '../hooks/useBidder'

export default function TokenTitle({
  tokenId,
  tokenAddress,
}: {
  tokenAddress: string
  tokenId: string
}) {
  const { tokenData } = useDaoToken({
    tokenAddress: tokenAddress,
    tokenId: tokenId,
  })

  const { bidder: holder } = useBidder(tokenData?.owner)

  if (!tokenData) return null

  return (
    <a
      href={`https://etherscan.io/address/${tokenData?.owner}`}
      target="_blank"
      rel="noreferrer"
      className="flex flex-col leading-5">
      <span className="opacity-50">Held by:</span>
      <span className="hover:underline">{holder}</span>
    </a>
  )
}
