import React, { useEffect, useState } from 'react'
import { useContractReads } from 'wagmi'
import { Hex } from 'viem'
import { viemClient } from '../viem/client'
import { auctionAbi } from '../abi'
import { useManagerContext } from './ManagerProvider'
import { AuctionProviderProps, AuctionReturnTypes } from '../types'

const AuctionContext = React.createContext({} as AuctionReturnTypes)

export function AuctionProvider({ children }: AuctionProviderProps) {
  const [auctionState, setAuctionState] = useState()
  const { daoAddresses } = useManagerContext()

  const auctionAddress = React.useMemo(
    () => daoAddresses?.auctionAddress as Hex,
    [daoAddresses]
  )

  // const auctionContract = {
  //   address: auctionAddress,
  //   abi: auctionAbi,
  //   chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
  // }

  // useEffect(() => {
  //   async function auctionState() {
  //     try {
  //       const auctionState = await viemClient?.multicall({
  //         contracts: [
  //           {
  //             ...auctionContract,
  //             functionName: 'auction',
  //           },
  //           {
  //             ...auctionContract,
  //             functionName: 'minBidIncrement',
  //           },
  //           {
  //             ...auctionContract,
  //             functionName: 'reservePrice',
  //           },
  //         ],
  //       })
  //       setAuctionState(auctionState)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //     auctionState()
  //   }
  // }, [])

  if (!auctionState) return null
  return (
    <AuctionContext.Provider
      value={{
        auctionAddress,
        auctionState: {
          // @ts-ignore
          tokenId: auctionState[0][0],
          // @ts-ignore
          highestBid: auctionState[0][1],
          // @ts-ignore
          highestBidder: auctionState[0][2],
          // @ts-ignore
          startTime: auctionState[0][3],
          // @ts-ignore
          endTime: auctionState[0][4],
          // @ts-ignore
          settled: auctionState[0][5],
          // @ts-ignore
          minBidIncrement: auctionState[1],
          // @ts-ignore
          reservePrice: auctionState[2],
        },
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
