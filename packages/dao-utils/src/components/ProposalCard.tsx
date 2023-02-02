import ProposalStatus from './ProposalStatus'
import ProposalTimestamp from './ProposalTimestamp'
import ProposalTitle from './ProposalTitle'
import Proposer from './Proposer'
import type { NounsProposal } from '../types/proposalQuery.generated'

export default function ProposalCard({ proposal }: NounsProposal) {
  return (
    <div className="p-4 text-black bg-slate-300 rounded-2xl">
      <div className="rounded-xl bg-gray-200 px-5 py-3">
        <div className="flex justify-between">
          <ProposalStatus proposal={proposal} />
          <ProposalTimestamp proposal={proposal} />
        </div>
        <ProposalTitle proposal={proposal} />
        <Proposer proposal={proposal} />
      </div>
    </div>
  )
}
