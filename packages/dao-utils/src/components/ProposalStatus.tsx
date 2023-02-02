import type { NounsProposal } from '../types/proposalQuery.generated'

export default function ProposalStatus({ proposal }: NounsProposal) {
  return <div>{proposal?.status}</div>
}
