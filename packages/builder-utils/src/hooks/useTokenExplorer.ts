import { useState, useCallback } from 'react'
import { useAuctionState } from './useAuctionState'

export function useTokenExplorer({ tokenId }: { tokenId: number }) {
  const { auctionState } = useAuctionState()

  const [navigatedTokenId, setNavigatedTokenId] = useState<number>(tokenId)

  const incrementId = useCallback(() => {
    if (navigatedTokenId < auctionState.tokenId) {
      setNavigatedTokenId(navigatedTokenId + 1)
    }
  }, [tokenId, navigatedTokenId])

  const decrementId = useCallback(() => {
    if (navigatedTokenId > 0) {
      setNavigatedTokenId(navigatedTokenId - 1)
    }
  }, [tokenId, navigatedTokenId])

  const isFirstToken = navigatedTokenId === 0
  const isLastToken = navigatedTokenId === auctionState.tokenId

  return {
    tokenId,
    navigatedTokenId,
    incrementId,
    decrementId,
    isFirstToken,
    isLastToken,
  }
}
