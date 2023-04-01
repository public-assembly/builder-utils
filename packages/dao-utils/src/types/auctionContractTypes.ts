import { BigNumber } from 'ethers'
import { TokenData } from '../hooks/useDaoToken'
import { HexString } from './wagmiTypes'

export interface AuctionProviderProps {
  children?: React.ReactNode
  tokenId?: string
}

export interface AuctionData {
  tokenId?: string
  address?: string
  metadata?: string | null
  duration?: string
  endTime?: string
  highestBidder: string
  highestBidPrice?: number
  highestBidPriceRaw?: string
  minBidIncrement?: number | null
  minBidAmount: number
  reservePrice?: string
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

  auctionData?: AuctionData
  totalSupply?: number
  createBid?: () => void
  updateBidAmount?: (value: string) => void
  createBidSuccess?: boolean
  createBidLoading?: boolean
  isValidBid?: boolean
  tokenData?: TokenData
  tokenId?: string
}
