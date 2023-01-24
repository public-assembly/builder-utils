import * as React from 'react'
import { useContractRead } from 'wagmi'
import { auctionAbi } from '../abi/auctionAbi'
import { useManagerProvider } from './ManagerProvider'
import { useActiveAuction, useDaoToken } from '../hooks'
import { BigNumber } from 'ethers'

export interface AuctionProviderProps {
  children?: React.ReactNode
  tokenId?: string
}

export interface AuctionReturnTypes {
  tokenAddress?: `0x${string}`
  auctionAddress?: `0x${string}`
  auctionState: {
    tokenId?: BigNumber
    highestBid?: BigNumber
    highestBidder?: `0x${string}`
    startTime?: number
    endTime?: number
    settled?: boolean
  }
  /**
   * TODO: Confirm types
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
const AuctionContext = React.createContext({} as AuctionReturnTypes)

export function AuctionProvider({ children, tokenId }: AuctionProviderProps) {
  const {
    tokenAddress,
    daoAddresses: { auctionAddress },
  } = useManagerProvider()

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
    address: auctionAddress as string,
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
export function useAuctionProvider() {
  return React.useContext(AuctionContext)
}
