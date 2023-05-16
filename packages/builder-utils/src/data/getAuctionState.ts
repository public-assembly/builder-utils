import { Hex } from 'viem'
import { viemClient, mainnetClient } from '../viem/client'
import { auctionAbi } from '../abi'

export interface Auction {
  tokenId: bigint
  highestBid: bigint
  highestBidder: Hex
  startTime: number
  endTime: number
  settled: boolean
}

export interface AuctionState extends Auction {
  auction: Auction
  minBidIncrement: bigint
  reservePrice: bigint
}

export const getAuctionState = async ({ auctionAddress }: { auctionAddress: Hex }) => {
  const auctionContract = {
    address: auctionAddress,
    abi: auctionAbi,
  } as const

  const auctionState = await viemClient?.multicall({
    contracts: [
      {
        ...auctionContract,
        functionName: 'auction',
      },
      {
        ...auctionContract,
        functionName: 'minBidIncrement',
      },
      {
        ...auctionContract,
        functionName: 'reservePrice',
      },
    ],
  })

  return { auctionState }
}
