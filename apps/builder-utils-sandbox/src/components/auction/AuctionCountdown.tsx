import * as React from 'react'
import { useCountdown } from '@public-assembly/builder-utils'

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
