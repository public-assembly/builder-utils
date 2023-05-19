import { useTokenMetadata } from '@public-assembly/builder-utils'

export function HistoricalAuction({ tokenId }: { tokenId: number }) {
  const { tokenName, tokenThumbnail } = useTokenMetadata(String(tokenId))

  return (
    <>
      <h1>{tokenName}</h1>
      <img src={tokenThumbnail} />
    </>
  )
}
