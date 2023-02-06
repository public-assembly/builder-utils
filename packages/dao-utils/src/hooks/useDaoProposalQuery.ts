/* @ts-ignore */
import useSWR from 'swr'
import { DAO_PROPOSAL_QUERY } from '../data/daoProposalQuery'
import { zoraApiFetcher } from '../lib/zoraApiFetcher'
import type { HexString } from '../types'

export function useDaoProposalQuery({ tokenAddress }: { tokenAddress?: HexString }) {
  const { data: proposals, error } = useSWR({ tokenAddress }, async () =>
    zoraApiFetcher(DAO_PROPOSAL_QUERY, {
      tokenAddress,
    })
  )

  return {
    proposals: proposals?.nouns?.nounsProposals.nodes,
    error,
  }
}
