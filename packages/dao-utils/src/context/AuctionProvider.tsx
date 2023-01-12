import * as React from 'react'
import { useContractRead } from 'wagmi'
import { auctionAbi } from '../abi/auctionAbi'

export interface AuctionProviderProps {
  children?: React.ReactNode
  /**
   * Pass in the dao contract auction address if you want to interact with the auction
   */
  auctionAddress?: string
}

export interface AuctionReturnTypes {
  auctionAddress?: string
  auctionState?: {
    tokenId: number
    highestBid: number
    highestBidder: string
    startTime: number
    endTime: number
    settled: boolean
  }
}
const AuctionContext = React.createContext({} as AuctionReturnTypes)

export function AuctionProvider({ children, auctionAddress }: AuctionProviderProps) {
  const { data: auction } = useContractRead({
    addressOrName: auctionAddress as string,
    contractInterface: auctionAbi,
    functionName: 'auction',
  })

  const auctionState = React.useMemo(() => {
    return {
      tokenId: auction?.tokenId,
      highestBid: auction?.highestBid,
      highestBidder: auction?.highestBidder,
      startTime: auction?.startTime,
      endTime: auction?.endTime,
      settled: auction?.settled,
    }
  }, [auction])

  return (
    <AuctionContext.Provider value={{ auctionAddress, auctionState }}>
      {children}
    </AuctionContext.Provider>
  )
}

// Access the context value of the AuctionProvider
export function useAuctionProvider() {
  return React.useContext(AuctionContext)
}
