import * as React from 'react'
import { NounsProposal } from '@public-assembly/builder-utils'

export default function ProposalDescription({ proposal }: { proposal: NounsProposal }) {
  return <div dangerouslySetInnerHTML={{ __html: proposal?.description }} />
}
