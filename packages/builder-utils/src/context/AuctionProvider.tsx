import React, { useEffect, useState } from 'react'
import { Hex } from 'viem'
import { viemClient } from '../viem/client'
import { auctionAbi } from '../abi'
import { useManagerContext } from './ManagerProvider'
import { AuctionProviderProps, AuctionReturnTypes } from '../types'

// const AuctionContext = React.createContext({} as AuctionReturnTypes)

const AuctionContext = React.createContext({})

export function AuctionProvider({ children }: AuctionProviderProps) {
  const [auctionState, setAuctionState] = useState()

  const { daoAddresses } = useManagerContext()

  const auctionAddress = React.useMemo(
    () => daoAddresses?.auctionAddress as Hex,
    [daoAddresses]
  )

  // const auctionAddress = daoAddresses?.auctionAddress as Hex

  // const auctionAddress = '0x4DD53079026017300C2489B91ceA62fFbe39ec19' as Hex

  const auctionContract = {
    address: auctionAddress,
    abi: auctionAbi,
  }

  useEffect(() => {
    ;(async () => {
      try {
        const auctionState = await viemClient?.multicall({
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
        // @ts-ignore
        setAuctionState(auctionState)
      } catch (error) {
        console.error(error)
      }
    })()
    // getAuctionState()
  }, [])

  console.log(auctionState)

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
