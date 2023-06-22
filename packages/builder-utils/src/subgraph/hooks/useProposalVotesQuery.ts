import useSWR from 'swr'
import { fetcher } from '../fetcher'
import { PROPOSAL_VOTES_QUERY } from '../queries/proposalVotes'
import { ProposalVotesQuery, ProposalVotesQueryVariables } from '../types/graphql'

export function useProposalVotesQuery({ proposalId }: { proposalId: string }) {
  const { data: proposalVotes, error } = useSWR<ProposalVotesQuery>(
    `proposalVotes-${proposalId}`,
    () => fetcher(PROPOSAL_VOTES_QUERY, { proposalId } as ProposalVotesQueryVariables)
  )

  return {
    proposalVotes: proposalVotes?.proposal?.votes,
    error,
  }
}
