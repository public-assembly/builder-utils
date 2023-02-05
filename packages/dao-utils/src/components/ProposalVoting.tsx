import { BigNumber } from 'ethers'
import * as React from 'react'
import { useGovernorContext } from '../context'
import { useVote } from '../hooks'

export default function ProposalVoting() {
  const { governorAddress, proposalId } = useGovernorContext()

  const [support, setSupport] = React.useState<BigNumber | undefined>()
  const [reason, setReason] = React.useState<string | undefined>()

  const { castVote, castVoteWithReason } = useVote({
    governorAddress: governorAddress,
    proposalId: proposalId,
    support: support,
    reason: reason,
  })

  return (
    <>
      <button onClick={() => setSupport(BigNumber.from(1))}>Vote For</button>
      <button onClick={() => setSupport(BigNumber.from(0))}>Vote Against</button>
      <button onClick={() => setSupport(BigNumber.from(2))}>Abstain</button>
      {reason === undefined ? (
        <button onClick={() => castVote}>Submit Vote</button>
      ) : (
        <button onClick={() => castVoteWithReason}>Submit Vote With Reason</button>
      )}
    </>
  )
}
