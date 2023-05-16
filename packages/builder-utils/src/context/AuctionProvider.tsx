import React from 'react'
import type { PropsWithChildren } from 'react'
import { Hex } from 'viem'
import { viemClient } from '../viem/client'
import { useManagerContext } from './ManagerProvider'
import { getAuctionState } from '../data/getAuctionState'

export interface Auction {
  tokenId: bigint
  highestBid: bigint
  highestBidder: Hex
  startTime: number
  endTime: number
  settled: boolean
  minBidIncrement: bigint
  reservePrice: bigint
}

// const AuctionContext = React.createContext({} as AuctionReturnTypes)

const AuctionContext = React.createContext({})

export function AuctionProvider({ children }: PropsWithChildren) {
  const { auctionAddress } = useManagerContext()

  // const auctionState = Promise.all([
  //   getAuctionState({ auctionAddress: '0x4DD53079026017300C2489B91ceA62fFbe39ec19' }),
  // ])

  // console.log(auctionState)

  let auctionState

  return (
    <AuctionContext.Provider
      value={{
        auctionAddress,
        auctionState,
        // tokenId: auctionState[0][0],
        // highestBid: auctionState[0][1],
        // highestBidder: auctionState[0][2],
        // startTime: auctionState[0][3],
        // endTime: auctionState[0][4],
        // settled: auctionState[0][5],
        // minBidIncrement: auctionState[1],
        // reservePrice: auctionState[2],
        // },
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
