import ProposalCard from './ProposalCard'
import { useGovernorContext } from '../context'

export default function ProposalCardGrid() {
  const { proposals } = useGovernorContext()

  return (
    <div className="flex flex-col space-y-8">
      {proposals instanceof Array &&
        proposals?.map((proposal) => (
          <div
            key={`${proposal.proposalId}`}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-[1440px]">
            <ProposalCard proposal={proposal} />
          </div>
        ))}
      ;
    </div>
  )
}
