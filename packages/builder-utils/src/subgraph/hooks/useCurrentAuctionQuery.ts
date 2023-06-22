import { Hex, formatEther } from 'viem'
import useSWR from 'swr'
import { fetcher } from '../fetcher'
import { CURRENT_AUCTION_QUERY } from '../queries/currentAuction'
import { CurrentAuctionQuery, CurrentAuctionQueryVariables } from '../types/graphql'
import { formatFromUnix } from '../../lib'
import { useEnsNameOrShorten } from '../../hooks'

export function useCurrentAuctionQuery({ tokenAddress }: { tokenAddress: Hex }) {
  const { data: currentAuction, error } = useSWR<CurrentAuctionQuery>(
    `currentAuction-${tokenAddress}`,
    () =>
      fetcher(CURRENT_AUCTION_QUERY, { id: tokenAddress } as CurrentAuctionQueryVariables)
  )

  return {
    tokenId: currentAuction?.dao?.currentAuction?.tokenId,
    startTime: currentAuction?.dao?.currentAuction?.startTime
      ? formatFromUnix(currentAuction?.dao?.currentAuction?.startTime)
      : '',
    endTime: currentAuction?.dao?.currentAuction?.endTime
      ? formatFromUnix(currentAuction?.dao?.currentAuction?.endTime)
      : '',
    extended: currentAuction?.dao?.currentAuction?.extended,
    settled: currentAuction?.dao?.currentAuction?.settled,
    error,
    winningBid: currentAuction?.dao?.currentAuction?.winningBid?.amount
      ? formatEther(BigInt(currentAuction?.dao?.currentAuction?.winningBid?.amount))
      : '',
    winningBidder: useEnsNameOrShorten({
      address: currentAuction?.dao?.currentAuction?.winningBid?.bidder,
    }).ensNameOrShorten,
    highestBid: currentAuction?.dao?.currentAuction?.highestBid?.amount
      ? formatEther(BigInt(currentAuction?.dao?.currentAuction?.highestBid?.amount))
      : '',
    highestBidder: useEnsNameOrShorten({
      address: currentAuction?.dao?.currentAuction?.highestBid?.bidder,
    }).ensNameOrShorten,
  }
}
