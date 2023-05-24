import * as React from 'react'
import ProposalPage from './ProposalPage'
import { useGovernorContext } from '@public-assembly/builder-utils'

export default function ProposalPageGrid() {
  const { proposals } = useGovernorContext()

  return (
    <div className="flex flex-col gap-y-4">
      {proposals?.map((proposal) => (
        <div key={`${proposal.proposalId}`}>
          <ProposalPage proposal={proposal} />
        </div>
      ))}
    </div>
  )
}