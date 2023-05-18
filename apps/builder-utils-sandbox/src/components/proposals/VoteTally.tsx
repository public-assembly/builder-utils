import * as React from 'react'
import { NounsProposal } from '@public-assembly/builder-utils'

export default function VoteTally({ proposal }: { proposal: NounsProposal }) {
  return (
    <div className="flex space-x-4">
      <div>For:&nbsp;{proposal?.forVotes}</div>
      <div>Against:&nbsp;{proposal?.againstVotes}</div>
      <div>Abstain:&nbsp;{proposal?.abstainVotes}</div>
    </div>
  )
}
