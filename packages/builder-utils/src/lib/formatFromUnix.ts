import { format, fromUnixTime } from 'date-fns'

export function formatFromUnix({ timestamp }: { timestamp: number }) {
  if (!timestamp) return

  const formattedTimestamp = format(fromUnixTime(timestamp), 'MMMM d, yyyy')

  return formattedTimestamp
}
