import { useState, useEffect } from 'react'
import { Hex, formatEther } from 'viem'
import { viemClient } from '../viem/client'
import { useManagerContext } from '../context'
import { auctionAbi } from '../abi'

export interface AuctionState {
  tokenId: number
  highestBid: string
  highestBidder: Hex
  startTime: number
  endTime: number
  settled: boolean
}

const initialAuctionState: AuctionState = {
  tokenId: 0,
  highestBid: '0',
  highestBidder: '0x0',
  startTime: 0,
  endTime: 0,
  settled: false,
}

export function useAuctionState() {
  const [auctionState, setAuctionState] = useState<AuctionState>(initialAuctionState)

  const { auctionAddress } = useManagerContext()

  useEffect(() => {
    if (!auctionAddress) return
    // prettier-ignore
    (async () => {
      try {
        const fetchedAuctionState = await viemClient?.readContract({
          address: auctionAddress as Hex,
          abi: auctionAbi,
          functionName: 'auction',
        })
        /**
         * Construct an object that matches the `AuctionState` interface
         */
        if (fetchedAuctionState) {
            const [tokenId, highestBid, highestBidder, startTime, endTime, settled] = fetchedAuctionState;
            setAuctionState({
              tokenId: Number(tokenId),
              highestBid: formatEther(highestBid),
              highestBidder,
              startTime,
              endTime,
              settled
            });
          }
      } catch (error) {
        console.log(error)
      }
    })()
  }, [auctionAddress])

  return { auctionState }
}
