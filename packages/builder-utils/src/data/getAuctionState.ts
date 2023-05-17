import { Hex } from 'viem'
import { viemClient } from '../viem/client'
import { auctionAbi } from '../abi'

type AuctionState = {
  tokenId: bigint
  highestBid: bigint
  highestBidder: Hex
  startTime: number
  endTime: number
  settled: boolean
}

export const getAuctionState = async ({ auctionAddress }: { auctionAddress: Hex }) => {
  const auctionState = await viemClient?.readContract({
    address: auctionAddress,
    abi: auctionAbi,
    functionName: 'auction',
  })

  return {
    auctionState: {
      tokenId: auctionState?.[0],
      highestBid: auctionState?.[1],
      highestBidder: auctionState?.[2],
      startTime: auctionState?.[3],
      endTime: auctionState?.[4],
      settled: auctionState?.[5],
    },
  }
}
