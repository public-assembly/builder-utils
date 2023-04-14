// @ts-nocheck
import React, { useContext } from 'react'
import { useContractReads } from 'wagmi'
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

  const auctionContract = {
    address: auctionAddress,
    abi: auctionAbi,
    chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
  }

  const { data: auction } = useContractReads({
    contracts: [
      {
        ...auctionContract,
        functionName: 'auction',
      },
      {
        ...auctionContract,
        functionName: 'minBidIncrement',
      },
      {
        ...auctionContract,
        functionName: 'reservePrice',
      },
    ],
  })

  return (
    <AuctionContext.Provider
      value={{
        auctionAddress,
        tokenId: Number(auction?.[0][0]),
        highestBid: auction?.[0][1],
        highestBidder: auction?.[0][2],
        startTime: auction?.[0][3],
        endTime: auction?.[0][4],
        settled: auction?.[0][5],
        minBidIncrement: auction?.[1],
        reservePrice: auction?.[2],
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
