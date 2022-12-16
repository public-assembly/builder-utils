import React from 'react'
import { useCountdown } from '@dao-auction/hooks/useCountdown'

export default function AuctionCountdown({ endTime }: { endTime: number }) {
  const { countdownString, isEnded } = useCountdown(endTime)

  return (
    <div className="flex flex-col">
      {!isEnded ? (
        <>
          <span>Auction ends in:</span>
          <span>{countdownString}</span>
        </>
      ) : (
        <span>Auction is complete</span>
      )}
    </div>
  )
}
