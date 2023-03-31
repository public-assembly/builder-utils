/* @ts-ignore */
import * as React from 'react'

export default function VoteTally({ proposal }) {
  return (
    <div className="flex space-x-4">
      <div>For:&nbsp;{proposal?.forVotes}</div>
      <div>Against:&nbsp;{proposal?.againstVotes}</div>
      <div>Abstain:&nbsp;{proposal?.abstainVotes}</div>
    </div>
  )
}
