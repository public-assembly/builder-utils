import { Hex } from 'viem'
import useSWR from 'swr'
import { fetcher } from '../fetcher'
import { DAO_PROPOSALS_QUERY } from '../queries/daoProposals'
import { DaoProposalsQuery, DaoProposalsQueryVariables } from '../types/graphql'

export function useDaoProposalsQuery({ tokenAddress }: { tokenAddress: Hex }) {
  const { data: daoProposals, error } = useSWR<DaoProposalsQuery>(
    `daoProposals-${tokenAddress}`,
    () => fetcher(DAO_PROPOSALS_QUERY, { id: tokenAddress } as DaoProposalsQueryVariables)
  )

  return {
    daoProposals: daoProposals?.dao?.proposals,
    error,
  }
}
