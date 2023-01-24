/* @ts-ignore */
import * as React from 'react'
import TokenThumbnail from './TokenThumbnail'
import TokenTitle from './TokenTitle'
import TokenHolder from './TokenHolder'
import TokenWinningBid from './TokenWinningBid'

export default function TokenRenderer({
  tokenId,
  tokenAddress,
  ...props
}: {
  tokenAddress: `0x${string}`
  tokenId: string
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-[1440px]" {...props}>
      <TokenThumbnail tokenId={tokenId} tokenAddress={tokenAddress} />
      <div className="flex flex-col justify-end gap-4">
        <TokenTitle tokenAddress={tokenAddress} tokenId={tokenId} />
        <div className="flex flex-row gap-10">
          <TokenHolder tokenAddress={tokenAddress} tokenId={tokenId} />
          <TokenWinningBid tokenAddress={tokenAddress} tokenId={tokenId} />
        </div>
      </div>
    </div>
  )
}
