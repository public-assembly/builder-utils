import * as React from 'react'
import { useCountdown } from '@public-assembly/builder-utils'
import { useSettle } from '@/hooks/useSettle'

export default function AuctionCountdown({ endTime }: { endTime: number }) {
  const { countdownString, isEnded } = useCountdown(endTime)
  const { settle, settleLoading } = useSettle()

  return (
    <div className="flex flex-col">
      {!isEnded ? (
        <>
          <span>Auction ends in:</span>
          <span>{countdownString}</span>
        </>
      ) : (
        <button disabled={settleLoading} onClick={() => settle?.()}>
          Settle auction
        </button>
      )}
    </div>
  )
}
