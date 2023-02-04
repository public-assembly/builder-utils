export default function ProposalDescription({ proposal }) {
  return <div dangerouslySetInnerHTML={{ __html: proposal?.description }} />
}
