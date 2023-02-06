import { BigNumber } from 'ethers'
import { HexString } from './wagmiTypes'

export interface AuctionProviderProps {
  children?: React.ReactNode
  tokenId?: string
}

export interface AuctionReturnTypes {
  tokenAddress?: HexString
  auctionAddress?: HexString
  auctionState: {
    tokenId?: BigNumber
    highestBid?: BigNumber
    highestBidder?: HexString
    startTime?: number
    endTime?: number
    settled?: boolean
  }
  /**
   * TODO: Update types
   */
  auctionData?: any
  totalSupply?: any
  createBid?: any
  updateBidAmount?: any
  createBidSuccess?: any
  createBidLoading?: any
  isValidBid?: any
  tokenData?: any
  tokenId?: any
}
