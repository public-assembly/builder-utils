import ProposalStatus from './ProposalStatus'
import ProposalTitle from './ProposalTitle'

export default function ProposalCard({ proposal }) {
  return (
    <div className="p-4 text-black bg-slate-300 rounded-2xl">
      <ProposalStatus proposal={proposal} />
      <ProposalTitle proposal={proposal} />
    </div>
  )
}
