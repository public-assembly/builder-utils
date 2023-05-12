import * as React from 'react'
import { useDaoTokenQuery, useBidder } from '../../hooks'
import { Hex } from 'viem'

export default function TokenTitle({
  tokenId,
  tokenAddress,
}: {
  tokenAddress: `0x${string}`
  tokenId: string
}) {
  const { tokenData } = useDaoTokenQuery({
    tokenAddress: tokenAddress,
    tokenId: tokenId,
  })

  const { bidder: holder } = useBidder(tokenData?.owner as Hex)

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
