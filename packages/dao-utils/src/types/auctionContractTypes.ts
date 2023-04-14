import { BigNumber } from 'ethers'
import { HexString } from './hexStringType'

export interface AuctionProviderProps {
  children: React.ReactNode
}

export interface AuctionReturnTypes {
  auctionAddress?: HexString
  // tokenId?: BigNumber
  tokenId: number
  highestBid?: BigNumber
  highestBidder?: HexString
  startTime?: number
  endTime?: number
  settled?: boolean
  minBidIncrement?: BigNumber
  reservePrice?: BigNumber
}
