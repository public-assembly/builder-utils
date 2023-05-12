/* @ts-ignore */
import * as React from 'react'
import useSWR from 'swr'
import { DAO_PROPOSAL_QUERY } from '../data/daoProposalQuery'
import { zoraApiFetcher } from '../lib/zoraApiFetcher'
import {
  HexString,
  NounishProposalsQuery,
  NounishProposalsQueryVariables,
} from '../types'
import { CHAIN } from '../constants/chain'

export function useDaoProposalQuery({ tokenAddress }: { tokenAddress?: HexString }) {
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
