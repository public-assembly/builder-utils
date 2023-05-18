import * as React from 'react'
import useSWR from 'swr'
import { DAO_PROPOSAL_QUERY } from '../queries'
import { zoraApiFetcher } from '../../lib'
import { Hex } from 'viem'
import { NounishProposalsQuery, NounishProposalsQueryVariables } from '../types'
import { CHAIN } from '../constants/chain'

export function useDaoProposalQuery({ tokenAddress }: { tokenAddress?: Hex }) {
  const { data: proposals, error } = useSWR<NounishProposalsQuery>(
    { tokenAddress, chain: CHAIN },
    async () =>
      zoraApiFetcher(DAO_PROPOSAL_QUERY, {
        tokenAddress,
        chain: CHAIN,
      } as NounishProposalsQueryVariables)
  )

  return {
    proposals: proposals?.nouns?.nounsProposals.nodes,
    error,
  }
}
