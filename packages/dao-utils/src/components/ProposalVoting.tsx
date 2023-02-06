/* @ts-ignore */
import * as React from 'react'
import { useVote } from '../hooks'
import { useGovernorContext } from '../context'

export default function ProposalVoting() {
  const [support, setSupport] = React.useState<0 | 1 | 2 | undefined>()
  const [reason, setReason] = React.useState<string | undefined>()

  const { castVote, castVoteWithReason } = useVote({
    support: support,
    reason: reason,
  })

  const { proposals } = useGovernorContext()

  if (proposals?.status == 'ACTIVE') {
    return (
      <div>
        <div className="flex justify-between">
          <div className="flex gap-x-4">
            <button
              className={support === 1 ? 'underline' : undefined}
              onClick={() => setSupport(1)}>
              For
            </button>
            <button
              className={support === 0 ? 'underline' : undefined}
              onClick={() => setSupport(0)}>
              Against
            </button>
            <button
              className={support === 2 ? 'underline' : undefined}
              onClick={() => setSupport(2)}>
              Abstain
            </button>
          </div>
          <div>
            {reason === undefined ? (
              <button disabled={support === undefined} onClick={() => castVote}>
                Submit Vote
              </button>
            ) : (
              <button disabled={support === undefined} onClick={() => castVoteWithReason}>
                Submit Vote With Reason
              </button>
            )}
          </div>
        </div>
        <textarea
          className="w-full bg-gray-200 rounded-xl px-4 py-2 mt-4"
          placeholder="In my eyes..."
          value={reason}
          onChange={(e) => {
            setReason(e.target.value)
          }}
          cols={40}
          rows={4}></textarea>
      </div>
    )
  }
  return null
}
