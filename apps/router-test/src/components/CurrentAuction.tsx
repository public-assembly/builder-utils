import { useTokenMetadata } from '@public-assembly/builder-utils'
import { Bidding } from './Bidding'

export function CurrentAuction({ tokenId }: { tokenId: string }) {

  const { tokenName, tokenThumbnail } = useTokenMetadata(tokenId)

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
