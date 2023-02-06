/* @ts-ignore */
import * as React from 'react'
import ProposalPage from './ProposalPage'
import { useGovernorContext } from '../context'

export default function ProposalPageGrid() {
  const { proposals } = useGovernorContext()

  return (
    <div className="flex flex-col gap-y-4">
      {proposals?.map((proposal) => (
        <div key={`${proposals.proposalId}`}>
          <ProposalPage proposal={proposal} />
        </div>
      ))}
    </div>
  )
}
