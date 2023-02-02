import type { NounsProposal } from '../types/proposalQuery.generated'

export default function ProposalTitle({ proposal }: NounsProposal) {
  return <div>{proposal?.title}</div>
}
