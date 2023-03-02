import React, { useContext } from 'react'
import { useContractRead } from 'wagmi'
import { auctionAbi } from '../abi'
import { useManagerContext } from './ManagerProvider'
import { useActiveAuction, useDaoToken } from '../hooks'
import { HexString, AuctionProviderProps, AuctionReturnTypes } from '../types'

const AuctionContext = React.createContext({} as AuctionReturnTypes)

export function AuctionProvider({ children, tokenId }: AuctionProviderProps) {
  const { tokenAddress, daoAddresses } = useManagerContext()

  const auctionAddress = React.useMemo(
    () => daoAddresses?.auctionAddress as HexString,
    [daoAddresses]
  )

  const {
    auctionData,
    totalSupply,
    createBid,
    updateBidAmount,
    createBidSuccess,
    createBidLoading,
    isValidBid,
  } = useActiveAuction(tokenAddress as string)

  const { tokenData } = useDaoToken({
    tokenAddress: tokenAddress,
    tokenId: tokenId as string,
  })

  const { data: auction } = useContractRead({
    address: auctionAddress,
    abi: auctionAbi,
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
    <AuctionContext.Provider
      value={{
        tokenAddress,
        tokenData,
        tokenId,
        auctionAddress,
        auctionData,
        auctionState,
        totalSupply,
        createBid,
        updateBidAmount,
        createBidSuccess,
        createBidLoading,
        isValidBid,
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
