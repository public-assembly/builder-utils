/* @ts-ignore */
import * as React from 'react'
import ProposalStatus from './ProposalStatus'
import ProposalTitle from './ProposalTitle'
import Proposer from './Proposer'
import ProposalTimestamp from './ProposalTimestamp'

export default function ProposalCard({ proposal }) {
  return (
    <div className="p-4 text-black bg-slate-300 rounded-2xl">
      <div className="rounded-xl bg-gray-200 px-5 py-3">
        <div className="flex justify-between">
          <ProposalStatus proposal={proposal} />
          <ProposalTimestamp proposal={proposal} />
        </div>
        <span className="font-bold text-xl">
          <ProposalTitle proposal={proposal} />
        </span>
        <Proposer proposal={proposal} />
      </div>
    </div>
  )
}
