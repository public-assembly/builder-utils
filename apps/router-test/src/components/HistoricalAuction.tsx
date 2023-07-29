import { useHistoricalTokenQuery } from '@public-assembly/builder-utils'

export function HistoricalAuction({ navigatedTokenId }: { navigatedTokenId: number }) {
  const { tokenName, tokenImage } = useHistoricalTokenQuery({
    tokenAddress: process.env.NEXT_PUBLIC_TOKEN_ADDRESS as `0x${string}`,
    tokenId: BigInt(navigatedTokenId),
  })

  return (
    <>
      <h1>{tokenName}</h1>
      <img src={tokenImage} width={500} height={500} />
    </>
  )
}
