import { Hex, formatEther } from 'viem'
import useSWR from 'swr'
import { fetcher } from '../fetcher'
import { HISTORICAL_AUCTION_QUERY } from '../queries/historicalAuction'
import { HistoricalAuctionQuery, HistoricalAuctionQueryVariables } from '../types/graphql'
import { formatFromUnix } from '../../lib'
import { useEnsNameOrShorten } from '../../hooks'

export function useHistoricalAuctionQuery({
  tokenAddress,
  tokenId,
}: {
  tokenAddress: Hex
  tokenId: BigInt
}) {
  const { data: historicalAuction, error } = useSWR<HistoricalAuctionQuery>(
    `historicalAuction-${tokenAddress}-${tokenId}`,
    () =>
      fetcher(HISTORICAL_AUCTION_QUERY, {
        id: tokenAddress,
        tokenId: tokenId.toString(),
      } as HistoricalAuctionQueryVariables)
  )
  return {
    tokenId: historicalAuction?.dao?.auctions[0]?.tokenId,
    startTime: historicalAuction?.dao?.auctions[0]?.startTime
      ? formatFromUnix(historicalAuction?.dao?.auctions[0]?.startTime)
      : '',
    endTime: historicalAuction?.dao?.auctions[0]?.endTime
      ? formatFromUnix(historicalAuction?.dao?.auctions[0]?.endTime)
      : '',
    extended: historicalAuction?.dao?.auctions[0]?.extended,
    settled: historicalAuction?.dao?.auctions[0]?.settled,
    winningBid: historicalAuction?.dao?.auctions[0]?.winningBid?.amount
      ? formatEther(BigInt(historicalAuction?.dao?.auctions[0]?.winningBid?.amount))
      : '',
    winningBidder: useEnsNameOrShorten({
      address: historicalAuction?.dao?.auctions[0]?.winningBid?.bidder,
    }).ensNameOrShorten,
    highestBid: historicalAuction?.dao?.auctions[0]?.highestBid?.amount
      ? formatEther(BigInt(historicalAuction?.dao?.auctions[0]?.highestBid?.amount))
      : '',
    highestBidder: useEnsNameOrShorten({
      address: historicalAuction?.dao?.auctions[0]?.highestBid?.bidder,
    }).ensNameOrShorten,
    bids: historicalAuction?.dao?.auctions.flatMap((auction) => {
      return auction?.bids
        ? auction.bids.map((bid) => ({
            bidder: bid.bidder,
            amount: formatEther(bid.amount),
          }))
        : []
    }),
    error,
  }
}
