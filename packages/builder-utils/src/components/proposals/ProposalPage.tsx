import * as React from 'react'
import ProposalStatus from './ProposalStatus'
import ProposalTitle from './ProposalTitle'
import Proposer from './Proposer'
import ProposalTimestamp from './ProposalTimestamp'
import VoteTally from './VoteTally'
import ProposalDescription from './ProposalDescription'
import ProposalVoting from './ProposalVoting'

export default function ProposalPage({ proposal }) {
  return (
    <div className="p-4 text-black bg-slate-300 rounded-2xl">
      <div className="rounded-xl bg-gray-200 px-5 py-3">
        <div className="flex justify-between">
          <ProposalStatus proposal={proposal} />
          <VoteTally proposal={proposal} />
        </div>
        <ProposalTimestamp proposal={proposal} />
        <br></br>
        <span className="font-bold text-xl">
          <ProposalTitle proposal={proposal} />
        </span>
        <Proposer proposal={proposal} />
      </div>
      <div className="py-3">
        <ProposalDescription proposal={proposal} />
      </div>
      <div>
        <br></br>
        <ProposalVoting proposal={proposal} />
      </div>
    </div>
  )
}
