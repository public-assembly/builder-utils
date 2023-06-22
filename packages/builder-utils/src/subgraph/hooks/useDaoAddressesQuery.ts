import { Hex } from 'viem'
import useSWR from 'swr'
import { fetcher } from '../fetcher'
import { DAO_ADDRESSES_QUERY } from '../queries/daoAddresses'
import { DaoAddressesQuery, DaoAddressesQueryVariables } from '../types/graphql'

/**
 * The `key` passed to the useSWR hook is the name of the query in camel case plus
 * the provided variables, separated by a hyphen
 */
export function useDaoAddressesQuery({ tokenAddress }: { tokenAddress: Hex }) {
  const { data: daoAddresses, error } = useSWR<DaoAddressesQuery>(
    `daoAddresses-${tokenAddress}`,
    () => fetcher(DAO_ADDRESSES_QUERY, { id: tokenAddress } as DaoAddressesQueryVariables)
  )

  return {
    auctionAddress: daoAddresses?.dao?.auctionAddress,
    treasuryAddress: daoAddresses?.dao?.treasuryAddress,
    governorAddress: daoAddresses?.dao?.governorAddress,
    metadataAddress: daoAddresses?.dao?.metadataAddress,
    error,
  }
}
