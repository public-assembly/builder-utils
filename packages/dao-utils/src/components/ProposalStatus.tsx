/* @ts-ignore */
import * as React from 'react'
import { useGovernorContext } from '../context'

export default function ProposalStatus({ proposal }) {
  return <div>{proposal?.status}</div>
}
