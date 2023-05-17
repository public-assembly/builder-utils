import React from 'react'
import type { PropsWithChildren } from 'react'
import { Hex } from 'viem'
import { useManagerContext } from './ManagerProvider'

export interface Auction {
  tokenId: bigint
  highestBid: bigint
  highestBidder: Hex
  startTime: number
  endTime: number
  settled: boolean
}

export interface AuctionState {
  auctionState: Auction
  minBidIncrement: bigint
  reservePrice: bigint
}

// extends AuctionState
export interface AuctionReturnTypes {
  auctionAddress: Hex
}

const AuctionContext = React.createContext({} as AuctionReturnTypes)

export function AuctionProvider({ children }: PropsWithChildren) {
  const { auctionAddress } = useManagerContext()

  return (
    <AuctionContext.Provider
      value={{
        auctionAddress: auctionAddress as Hex,
      }}>
      {children}
    </AuctionContext.Provider>
  )
}

// Access the context value of the AuctionProvider
export const useAuctionContext = () => {
  const context = React.useContext(AuctionContext)
  if (!context) {
    throw Error('useAuctionContext hook must be used within a AuctionProvider')
  }
  return context
}
