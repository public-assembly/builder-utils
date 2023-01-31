export const dateFormat: [string, Intl.DateTimeFormatOptions] = [
  'en-us',
  {
    hour: 'numeric',
    minute: 'numeric',
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  },
]

export function unixToDate(timestamp?: number) {
  if (!timestamp) {
    return ''
  }

  return timestamp.toLocaleString(...dateFormat)
}
