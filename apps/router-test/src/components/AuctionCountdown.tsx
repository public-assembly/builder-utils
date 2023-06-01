import { useCountdown } from '@public-assembly/builder-utils'
import { SettleAuction } from './SettleAuction'

export function AuctionCountdown({ endTime }: { endTime: number }) {
  const { countdownString, isEnded } = useCountdown(endTime)

  return (
    <div>
      {!isEnded ? (
        <>
          <span>Auction ends in:</span>
          <span>{countdownString}</span>
        </>
      ) : (
        <SettleAuction />
      )}
    </div>
  )
}
