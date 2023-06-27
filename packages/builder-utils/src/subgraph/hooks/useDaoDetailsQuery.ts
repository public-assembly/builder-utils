import { Hex } from 'viem'
import useSWR from 'swr'
import { fetcher } from '../fetcher'
import { DAO_DETAILS_QUERY } from '../queries/daoDetails'
import { DaoDetailsQuery, DaoDetailsQueryVariables } from '../types/graphql'
import { formatEther } from 'viem'

export function useDaoDetailsQuery({ tokenAddress }: { tokenAddress: Hex }) {
  const { data: daoDetails, error } = useSWR<DaoDetailsQuery>(
    `daoDetails-${tokenAddress}`,
    () => fetcher(DAO_DETAILS_QUERY, { id: tokenAddress } as DaoDetailsQueryVariables)
  )

  return {
    daoDetails: {
      name: daoDetails?.dao?.name,
      symbol: daoDetails?.dao?.symbol,
      description: daoDetails?.dao?.description,
      contractImage: daoDetails?.dao?.contractImage,
      projectURI: daoDetails?.dao?.projectURI,
      ownerCount: daoDetails?.dao?.ownerCount,
      totalSupply: daoDetails?.dao?.totalSupply,
      totalAuctionSales: daoDetails?.dao?.totalAuctionSales
        ? formatEther(BigInt(daoDetails?.dao?.totalAuctionSales))
        : '',
      proposalCount: daoDetails?.dao?.proposalCount,
    },
    error,
  }
}
