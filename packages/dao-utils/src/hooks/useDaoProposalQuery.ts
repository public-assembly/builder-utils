/* @ts-ignore */
import useSWR from 'swr'
import { DAO_PROPOSAL_QUERY } from '../data/daoProposalQuery'
import { zoraApiFetcher } from '../lib/zoraApiFetcher'
import { HexString, NounishProposalsQuery } from '../types'

export function useDaoProposalQuery({ tokenAddress }: { tokenAddress?: HexString }) {
  const { data: proposals, error } = useSWR<NounishProposalsQuery>(
    { tokenAddress },
    async () =>
      zoraApiFetcher(DAO_PROPOSAL_QUERY, {
        tokenAddress,
      })
  )

  return {
    proposals: proposals?.nouns?.nounsProposals.nodes,
    error,
  }
}
