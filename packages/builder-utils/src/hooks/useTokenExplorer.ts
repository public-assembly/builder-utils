import { useState, useCallback } from 'react'
import { useAuctionContext } from '../context'

export function useTokenExplorer() {
  const { auctionState } = useAuctionContext()

  const tokenId = Number(auctionState.tokenId)

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
