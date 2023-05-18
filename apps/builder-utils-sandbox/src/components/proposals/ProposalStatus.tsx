import * as React from 'react'
import { NounsProposal } from '@public-assembly/builder-utils'

export default function ProposalStatus({ proposal }: { proposal: NounsProposal }) {
  return <div>{proposal?.status}</div>
}
