/* @ts-ignore */
import * as React from 'react'

export default function ProposalTimestamp({ proposal }) {
  const dateFormat: [string, Intl.DateTimeFormatOptions] = [
    'en-us',
    {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    },
  ]

  const voteStart = new Date(proposal?.voteStart * 1000).toLocaleString(...dateFormat)

  return <div>{voteStart}</div>
}
