import * as React from 'react'
import { useBid } from '../../hooks'

export default function TokenWinningBid({
  tokenId,
  tokenAddress,
}: {
  tokenAddress: `0x${string}`
  tokenId: string
}) {
  // @ts-ignore
  const { winningBid, winningTx } = useBid({
    tokenId,
    tokenAddress,
  })

  return (
    <div className="flex flex-col leading-5">
      <span className="opacity-50">Winning bid:</span>
      <a
        href={winningTx}
        target="_blank"
        rel="noreferrer"
        className={`${!winningTx && 'pointer-events-none'} hover:underline`}>
        {winningBid}
      </a>
    </div>
  )
}
