import { useTokenMetadata, useAuctionState } from '@public-assembly/builder-utils'
import { Bidding } from './Bidding'

export function CurrentAuction() {
  const { auctionState } = useAuctionState()
  const { tokenName, tokenThumbnail } = useTokenMetadata(String(auctionState?.tokenId))

  return (
    <>
      <div>
        <h1>{tokenName}</h1>
        <img src={tokenThumbnail} width={500} height={500} />
      </div>
      <Bidding />
    </>
  )
}
