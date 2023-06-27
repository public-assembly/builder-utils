'use client'

import {
  useAuctionState,
  useHistoricalTokenQuery,
  useHistoricalAuctionQuery,
  useMinBidAmount,
  useAuctionConfigQuery,
  useProposalVotesQuery,
  useHistoricalBids,
  useProposalDetailsQuery,
  useCurrentAuctionQuery,
} from '@public-assembly/builder-utils'
import Link from 'next/link'

export default function Page() {
  const { auctionState } = useAuctionState()

  // console.log(auctionState)

  const currentTokenId = auctionState.tokenId

  // const { tokenName, tokenId, tokenOwner, tokenImage, mintedAt } =
  //   useHistoricalTokenQuery({
  //     tokenAddress: '0xd2e7684cf3e2511cc3b4538bb2885dc206583076',
  //     tokenId: currentTokenId ? BigInt(auctionState.tokenId) : BigInt(false),
  //   })

  // console.log(tokenName, tokenId, tokenOwner, tokenImage, mintedAt)

  // const { winningBid, startTime, endTime, bids, winningBidder } =
  //   useHistoricalAuctionQuery({
  //     tokenAddress: '0xd2e7684cf3e2511cc3b4538bb2885dc206583076',
  //     // tokenId: currentTokenId ? BigInt(auctionState.tokenId) : BigInt(false),
  //     tokenId: BigInt(54),
  //   })

  // console.log(bids)

  // const { minimumBidIncrement } = useAuctionConfigQuery({
  //   tokenAddress: '0xd2e7684cf3e2511cc3b4538bb2885dc206583076',
  // })

  const { bids } = useCurrentAuctionQuery({
    tokenAddress: '0xdf9b7d26c8fc806b1ae6273684556761ff02d422',
  })

  console.log(bids)

  // console.log(minimumBidIncrement)

  // const { minBidAmount } = useMinBidAmount()

  // console.log('Min bid amount:', minBidAmount)

  // const { proposalVotes } = useProposalVotesQuery({
  //   proposalId: '0xb0f228abbc5af114f9844f299b5d97ab99959f36786a8cfaddf237e072906956',
  // })

  // console.log(proposalVotes)

  // const { filteredBidEvents } = useHistoricalBids({
  //   tokenAddress: '0xd2e7684cf3e2511cc3b4538bb2885dc206583076',
  //   tokenId: String(auctionState.tokenId),
  // })

  // console.log(filteredBidEvents)

  return (
    <>
      <h1>Home</h1>
      {/* Recommended to use the <Link /> tag when navigating between routes */}
      <Link href={`/${auctionState.tokenId}`}>Go to auction</Link>
    </>
  )
}
