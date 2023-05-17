import { useState, useEffect } from 'react'
import { auctionAbi } from '../abi'
import { Hex, Hash } from 'viem'
import { viemClient } from '../viem/client'
import { useManagerContext } from '../context'
import { getAuctionState } from '../data/getAuctionState'
import { useMinBidAmount } from './useMinBidAmount'

export interface AuctionState {
  auctionState: {
    tokenId?: bigint
    highestBid?: bigint
    highestBidder?: Hex
    startTime?: number
    endTime?: number
    settled?: boolean
  }
}

export function useCreateBid({ tokenAddress }: { tokenAddress: Hex }): any {
  const [hash, setHash] = useState<Hash>()

  const { auctionAddress } = useManagerContext()

  const [auctionState, setAuctionState] = useState<AuctionState>()

  useEffect(() => {
    // prettier-ignore
    (async () => {
      try {
        const fetchedAuctionState = await getAuctionState({ auctionAddress: auctionAddress as Hex })
        setAuctionState(fetchedAuctionState)
      } catch(error) {
        console.log(error)
      }
    })()
  }, [auctionAddress])

  const { minBidAmount, bidAmount, setBidAmount, updateBidAmount, isValidBid } =
    useMinBidAmount({ tokenAddress: tokenAddress })

  const createBid = async () => {
    // @ts-ignore
    const { result } = await viemClient?.simulateContract({
      address: auctionAddress as Hex,
      abi: auctionAbi,
      functionName: 'createBid',
      args: [BigInt(auctionState?.auctionState.tokenId as bigint)],
      value: BigInt(bidAmount),
    })
  }

  return {
    createBid,
    minBidAmount,
    updateBidAmount,
    isValidBid,
    auctionAddress,
  }
}
