/* @ts-ignore */
import useSWR from 'swr'
import { DAO_PROPOSAL_QUERY } from '../data/daoProposalQuery'
import { zoraApiFetcher } from '../lib/zoraApiFetcher'
import { HexString, Chain, NounishProposalsQuery } from '../types'

export const CHAIN = {
  1: Chain.Mainnet,
  5: Chain.Goerli,
}[process.env.NEXT_PUBLIC_CHAIN_ID || 1] as Chain

export function useDaoProposalQuery({ tokenAddress }: { tokenAddress?: HexString }) {
  const { data: proposals, error } = useSWR<NounishProposalsQuery>(
    { tokenAddress, chain: CHAIN },
    async () =>
      zoraApiFetcher(DAO_PROPOSAL_QUERY, {
        tokenAddress,
        chain: CHAIN,
      })
  )

  return {
    proposals: proposals?.nouns?.nounsProposals.nodes,
    error,
  }
}
