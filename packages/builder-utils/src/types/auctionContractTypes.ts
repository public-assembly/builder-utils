import { BigNumber } from 'ethers'
import { HexString } from './hexStringType'

export interface AuctionProviderProps {
  children: React.ReactNode
}

export interface AuctionReturnTypes {
  auctionAddress?: HexString
  auctionState: {
    tokenId: BigNumber
    highestBid: BigNumber
    highestBidder: HexString
    startTime: number
    endTime: number
    settled: boolean
    minBidIncrement: BigNumber
    reservePrice: BigNumber
  }
}
