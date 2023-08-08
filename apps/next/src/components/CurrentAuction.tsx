import { useHistoricalTokenQuery } from '@public-assembly/builder-utils'
import { Bidding } from './Bidding'

export function CurrentAuction({ tokenId }: { tokenId: string }) {
  const { tokenName, tokenImage } = useHistoricalTokenQuery({
    tokenAddress: '0xd2e7684cf3e2511cc3b4538bb2885dc206583076',
    tokenId: BigInt(tokenId),
  })

  return (
    <>
      <div>
        <h1>{tokenName}</h1>
        <img src={tokenImage} width={500} height={500} />
      </div>
      <Bidding />
    </>
  )
}
