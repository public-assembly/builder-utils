import { useState, useCallback, useEffect } from 'react'
import { Hex } from 'viem'
import { getAuctionState } from '../data/getAuctionState'

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

export function useTokenExplorer({ auctionAddress }: { auctionAddress: Hex }) {
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

  const tokenId = Number(auctionState?.auctionState.tokenId)

  const [currentTokenId, setCurrentTokenId] = useState<number>(tokenId)

  const incrementId = useCallback(() => {
    if (currentTokenId < tokenId) {
      setCurrentTokenId(currentTokenId + 1)
    }
  }, [tokenId, currentTokenId])

  const decrementId = useCallback(() => {
    if (currentTokenId > 0) {
      setCurrentTokenId(currentTokenId - 1)
    }
  }, [tokenId, currentTokenId])

  const isFirstToken = currentTokenId === 0
  const isLastToken = tokenId === currentTokenId

  return {
    auctionState,
    tokenId,
    currentTokenId,
    incrementId,
    decrementId,
    isFirstToken,
    isLastToken,
  }
}
