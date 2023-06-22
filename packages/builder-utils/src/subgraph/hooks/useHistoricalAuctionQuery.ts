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
    tokenId: historicalAuction?.dao?.tokens[0]?.tokenId,
    startTime: historicalAuction?.dao?.tokens[0]?.auction?.startTime
      ? formatFromUnix(historicalAuction?.dao?.tokens[0]?.auction?.startTime)
      : '',
    endTime: historicalAuction?.dao?.tokens[0]?.auction?.endTime
      ? formatFromUnix(historicalAuction?.dao?.tokens[0]?.auction?.endTime)
      : '',
    extended: historicalAuction?.dao?.tokens[0]?.auction?.extended,
    settled: historicalAuction?.dao?.tokens[0]?.auction?.settled,
    winningBid: historicalAuction?.dao?.tokens[0]?.auction?.winningBid?.amount
      ? formatEther(
          BigInt(historicalAuction?.dao?.tokens[0]?.auction?.winningBid?.amount)
        )
      : '',
    winningBidder: useEnsNameOrShorten({
      address: historicalAuction?.dao?.tokens[0]?.auction?.winningBid?.bidder,
    }).ensNameOrShorten,
    highestBid: historicalAuction?.dao?.tokens[0]?.auction?.highestBid?.amount
      ? formatEther(
          BigInt(historicalAuction?.dao?.tokens[0]?.auction?.highestBid?.amount)
        )
      : '',
    highestBidder: useEnsNameOrShorten({
      address: historicalAuction?.dao?.tokens[0]?.auction?.highestBid?.bidder,
    }).ensNameOrShorten,
    bids: historicalAuction?.dao?.tokens.flatMap((auction) => {
      return auction?.auction?.bids
        ? auction?.auction?.bids.map((bid) => ({
            bidder: bid.bidder,
            amount: formatEther(bid.amount),
          }))
        : []
    }),
    error,
  }
}
