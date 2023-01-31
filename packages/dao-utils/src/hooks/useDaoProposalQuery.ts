/* @ts-ignore */
import useSWR from 'swr'
import { DAO_PROPOSAL_QUERY } from '../data/daoProposalQuery'
import { zoraApiFetcher } from '../lib/zoraApiFetcher'
import type { Hash } from '../types'

export function useDaoProposalQuery({ tokenAddress }: { tokenAddress?: Hash }) {
  const { data: proposals, error } = useSWR({ tokenAddress }, async () =>
    zoraApiFetcher(DAO_PROPOSAL_QUERY, {
      tokenAddress,
    })
  )

  return {
    proposals: proposals?.nouns?.nounsProposals,
    error,
  }
}
