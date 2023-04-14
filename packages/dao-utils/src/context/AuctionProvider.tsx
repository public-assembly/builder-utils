import React, { useContext } from 'react'
import { useContractRead } from 'wagmi'
import { auctionAbi } from '../abi'
import { useManagerContext } from './ManagerProvider'
import { HexString, AuctionProviderProps, AuctionReturnTypes } from '../types'

const AuctionContext = React.createContext({} as AuctionReturnTypes)

export function AuctionProvider({ children }: AuctionProviderProps) {
  const { daoAddresses } = useManagerContext()

  const auctionAddress = React.useMemo(
    () => daoAddresses?.auctionAddress as HexString,
    [daoAddresses]
  )

  const { data: auction } = useContractRead({
    address: auctionAddress,
    abi: auctionAbi,
    functionName: 'auction',
    chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
  })

  return (
    <AuctionContext.Provider
      value={{
        auctionAddress,
        tokenId: auction?.tokenId,
        highestBid: auction?.highestBid,
        highestBidder: auction?.highestBidder,
        startTime: auction?.startTime,
        endTime: auction?.endTime,
        settled: auction?.settled,
      }}>
      {children}
    </AuctionContext.Provider>
  )
}

// Access the context value of the AuctionProvider
export const useAuctionContext = () => {
  const context = useContext(AuctionContext)
  if (!context) {
    throw Error('useAuctionContext hook must be used within a AuctionProvider')
  }
  return context
}
