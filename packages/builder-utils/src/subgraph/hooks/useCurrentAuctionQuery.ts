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

  const winningBidder = useEnsNameOrShorten({
    address: currentAuction?.dao?.currentAuction?.winningBid?.bidder,
  })
  const highestBidder = useEnsNameOrShorten({
    address: currentAuction?.dao?.currentAuction?.highestBid?.bidder,
  })

  return {
    tokenId: currentAuction?.dao?.currentAuction?.token?.tokenId,
    startTime: currentAuction?.dao?.currentAuction?.startTime
      ? formatFromUnix({
          timestamp: currentAuction?.dao?.currentAuction?.startTime,
        })
      : '',
    endTime: currentAuction?.dao?.currentAuction?.endTime
      ? formatFromUnix({
          timestamp: currentAuction?.dao?.currentAuction?.endTime,
        })
      : '',
    extended: currentAuction?.dao?.currentAuction?.extended,
    settled: currentAuction?.dao?.currentAuction?.settled,
    winningBid: currentAuction?.dao?.currentAuction?.winningBid?.amount
      ? formatEther(BigInt(currentAuction?.dao?.currentAuction?.winningBid?.amount))
      : '',
    winningBidder: winningBidder,
    highestBid: currentAuction?.dao?.currentAuction?.highestBid?.amount
      ? formatEther(BigInt(currentAuction?.dao?.currentAuction?.highestBid?.amount))
      : '',
    highestBidder: highestBidder,
    bids: currentAuction?.dao?.currentAuction?.bids?.map((bid) => {
      return {
        bidder: bid.bidder,
        amount: formatEther(bid.amount),
      }
    }),
    error,
  }
}
