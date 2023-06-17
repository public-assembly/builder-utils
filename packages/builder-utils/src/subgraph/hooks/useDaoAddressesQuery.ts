import { Hex } from 'viem'
import useSWR from 'swr'
import { fetcher } from '../fetcher'
import { DAO_ADDRESSES_QUERY } from '../queries/daoAddresses'
import { DaoAddressesQueryVariables } from '../types/graphql'

/**
 * The key passed to the useSWR hook is the name of the query in camel case plus
 * the provided variables, separated by a hyphen
 */
export function useDaoAddressesQuery({ tokenAddress }: { tokenAddress: Hex }) {
  /**
   * By default the `key`, in this case `id` is passed to fetcher as the argument
   */
  const { data: daoAddresses, error } = useSWR(`daoAddresses-${tokenAddress}`, () =>
    fetcher(DAO_ADDRESSES_QUERY, { id: tokenAddress } as DaoAddressesQueryVariables)
  )

  return { daoAddresses, error }
}
