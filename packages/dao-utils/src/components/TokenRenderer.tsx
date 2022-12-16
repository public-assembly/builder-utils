import React from 'react'
import TokenThumbnail from './TokenThumbnail'
import TokenTitle from './TokenTitle'
import TokenHolder from './TokenHolder'
import TokenWinningBid from './TokenWinningBid'

export default function TokenRenderer({
  tokenId,
  daoAddress,
  ...props
}: {
  daoAddress: string
  tokenId: string
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-[1440px]" {...props}>
      <TokenThumbnail tokenId={tokenId} daoAddress={daoAddress} />
      <div className="flex flex-col justify-end gap-4">
        <TokenTitle daoAddress={daoAddress} tokenId={tokenId} />
        <div className="flex flex-row gap-10">
          <TokenHolder daoAddress={daoAddress} tokenId={tokenId} />
          <TokenWinningBid daoAddress={daoAddress} tokenId={tokenId} />
        </div>
      </div>
    </div>
  )
}
