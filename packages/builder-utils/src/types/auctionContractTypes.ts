import { Hex } from 'viem'

export interface AuctionProviderProps {
  children: React.ReactNode
}

export interface AuctionReturnTypes {
  auctionAddress?: Hex
  auctionState: {
    tokenId: bigint
    highestBid: bigint
    highestBidder: Hex
    startTime: number
    endTime: number
    settled: boolean
    minBidIncrement: bigint
    reservePrice: bigint
  }
}
