import { useHistoricalTokenQuery } from '@public-assembly/builder-utils'

export function HistoricalAuction({ navigatedTokenId }: { navigatedTokenId: number }) {
  const { tokenName, tokenImage } = useHistoricalTokenQuery({
    tokenAddress: '0xd2e7684cf3e2511cc3b4538bb2885dc206583076',
    tokenId: BigInt(navigatedTokenId),
  })

  return (
    <>
      <h1>{tokenName}</h1>
      <img src={tokenImage} width={500} height={500} />
    </>
  )
}
