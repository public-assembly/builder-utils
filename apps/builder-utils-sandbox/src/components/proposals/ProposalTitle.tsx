import * as React from 'react'
import { NounsProposal } from '@public-assembly/builder-utils'

export default function ProposalTitle({ proposal }: { proposal: NounsProposal }) {
  return <div>{proposal?.title}</div>
}
