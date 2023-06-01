import { useTokenMetadata } from '@public-assembly/builder-utils'

export function HistoricalAuction({ navigatedTokenId }: { navigatedTokenId: number }) {
  const { tokenName, tokenThumbnail } = useTokenMetadata(String(navigatedTokenId))

  return (
    <>
      <h1>{tokenName}</h1>
      <img src={tokenThumbnail} width={500} height={500} />
    </>
  )
}
