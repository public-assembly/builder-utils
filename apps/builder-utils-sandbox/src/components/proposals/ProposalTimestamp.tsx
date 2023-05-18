import * as React from 'react'
import { NounsProposal } from '@public-assembly/builder-utils'

export default function ProposalTimestamp({ proposal }: { proposal: NounsProposal }) {
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
