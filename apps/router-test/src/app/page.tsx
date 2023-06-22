'use client'

import {
  useAuctionState,
  useHistoricalTokenQuery,
  useHistoricalAuctionQuery,
  useMinBidAmount,
  useAuctionConfigQuery,
  useProposalVotesQuery,
} from '@public-assembly/builder-utils'
import Link from 'next/link'

export default function Page() {
  const { auctionState } = useAuctionState()

  console.log(auctionState)

  const currentTokenId = auctionState.tokenId

  const { tokenName, tokenId, tokenOwner, tokenImage, mintedAt } =
    useHistoricalTokenQuery({
      tokenAddress: '0xd2e7684cf3e2511cc3b4538bb2885dc206583076',
      tokenId: currentTokenId ? BigInt(auctionState.tokenId) : BigInt(false),
    })

  console.log(tokenName, tokenId, tokenOwner, tokenImage, mintedAt)

  const { winningBid, highestBid, startTime, endTime, bids } = useHistoricalAuctionQuery({
    tokenAddress: '0xd2e7684cf3e2511cc3b4538bb2885dc206583076',
    tokenId: currentTokenId ? BigInt(auctionState.tokenId) : BigInt(false),
  })

  console.log(winningBid, highestBid, startTime, endTime, bids)

  const { minimumBidIncrement } = useAuctionConfigQuery({
    tokenAddress: '0xd2e7684cf3e2511cc3b4538bb2885dc206583076',
  })

  console.log(minimumBidIncrement)

  const { minBidAmount } = useMinBidAmount()

  console.log('Min bid amount:', minBidAmount)

  const { proposalVotes } = useProposalVotesQuery({
    proposalId: '0xb0f228abbc5af114f9844f299b5d97ab99959f36786a8cfaddf237e072906956',
  })

  console.log(proposalVotes)

  return (
    <>
      <h1>Home</h1>
      {/* Recommended to use the <Link /> tag when navigating between routes */}
      <Link href={`/${auctionState.tokenId}`}>Go to auction</Link>
    </>
  )
}
