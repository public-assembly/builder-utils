import * as React from 'react'
import { intervalToDuration, getUnixTime } from 'date-fns'
import { useInterval } from '@hooks/index'

interface Countdown {
  isEnded: boolean
  countdownString: string
}

export function useCountdown(endTime: number): Countdown {
  const [now, setNow] = React.useState(getUnixTime(Date.now() * 1000))
  const [end, setEnd] = React.useState(endTime * 1000)

  useInterval(() => {
    setNow(getUnixTime(Date.now() * 1000))
    setEnd(endTime * 1000)
  }, 1000)

  const countdownString = React.useMemo(() => {
    const difference = Math.abs(end - now)
    const { days, hours, minutes, seconds } = intervalToDuration({
      start: 0,
      end: difference,
    })
    return `${days && days > 0 ? days + 'd ' : ''}${hours}h ${minutes}m ${seconds}s`
  }, [now])

  return {
    isEnded: now >= end,
    countdownString,
  }
}
