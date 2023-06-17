'use client'

import {
  useAuctionState,
  useHistoricalTokenQuery,
  useHistoricalAuctionQuery,
  useMinBidAmount,
  useAuctionConfigQuery,
} from '@public-assembly/builder-utils'
import Link from 'next/link'

export default function Page() {
  const { auctionState } = useAuctionState()

  const { tokenName, tokenId, tokenOwner, tokenImage, mintedAt } =
    useHistoricalTokenQuery({
      tokenAddress: '0xd2e7684cf3e2511cc3b4538bb2885dc206583076',
      tokenId: BigInt(auctionState.tokenId),
    })

  console.log(tokenName, tokenId, tokenOwner, tokenImage, mintedAt)

  const { winningBid, highestBid, startTime, endTime, bids } = useHistoricalAuctionQuery({
    tokenAddress: '0xd2e7684cf3e2511cc3b4538bb2885dc206583076',
    tokenId: BigInt(auctionState.tokenId),
  })

  console.log(winningBid, highestBid, startTime, endTime, bids)

  const { minimumBidIncrement } = useAuctionConfigQuery({
    tokenAddress: '0xd2e7684cf3e2511cc3b4538bb2885dc206583076',
  })

  console.log(minimumBidIncrement)

  const { minBidAmount } = useMinBidAmount()

  console.log('Min bid amount:', minBidAmount)

  return (
    <>
      <h1>Home</h1>
      {/* Recommended to use the <Link /> tag when navigating between routes */}
      <Link href={`/${auctionState.tokenId}`}>Go to auction</Link>
    </>
  )
}
