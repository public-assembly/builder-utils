import { BigNumber } from 'ethers'
import { HexString } from './wagmiTypes'

export interface AuctionProviderProps {
  children: React.ReactNode
}

export interface AuctionReturnTypes {
  auctionAddress?: HexString
  tokenId?: BigNumber
  highestBid?: BigNumber
  highestBidder?: HexString
  startTime?: number
  endTime?: number
  settled?: boolean
}
