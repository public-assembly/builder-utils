import * as React from 'react'
import { useContractRead } from 'wagmi'
import { auctionAbi } from '../abi/auctionAbi'
import { useManagerProvider } from './ManagerProvider'
import { useActiveAuction, useDaoAuctionQuery, useDaoToken } from '../hooks'

export interface AuctionProviderProps {
  children?: React.ReactNode
  tokenId?: string
}

export interface AuctionReturnTypes {
  tokenAddress?: string
  auctionAddress?: string
  auctionState?: {
    tokenId: number
    highestBid: number
    highestBidder: string
    startTime: number
    endTime: number
    settled: boolean
  }
  /**
   * TODO: Confirm types
   */
  auctionData?: any
  tokenData?: any
}
const AuctionContext = React.createContext({} as AuctionReturnTypes)

export function AuctionProvider({ children, tokenId }: AuctionProviderProps) {
  const {
    tokenAddress,
    daoAddresses: { auctionAddress },
  } = useManagerProvider()

  const { auctionData } = useActiveAuction(tokenAddress as string)
  const { tokenData } = useDaoToken({
    tokenAddress: tokenAddress as string,
    tokenId: tokenId as string,
  })

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
    <AuctionContext.Provider
      value={{ tokenAddress, auctionAddress, auctionState, auctionData, tokenData }}>
      {children}
    </AuctionContext.Provider>
  )
}

// Access the context value of the AuctionProvider
export function useAuctionProvider() {
  return React.useContext(AuctionContext)
}
