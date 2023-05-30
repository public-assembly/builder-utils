'use client'

import { useTokenExplorer } from '@public-assembly/builder-utils'
import { CurrentAuction } from './CurrentAuction'
import { HistoricalAuction } from './HistoricalAuction'
import { useRouter } from 'next/navigation'

export function AuctionSkeleton({ tokenId }: { tokenId: string }) {
  const { navigatedTokenId, incrementId, decrementId, isFirstToken, isLastToken } =
    useTokenExplorer({ tokenId: Number(tokenId) })

  const router = useRouter()

  const renderContent = () => {
    if (isLastToken) {
      return <CurrentAuction tokenId={tokenId} />
    } else {
      return <HistoricalAuction tokenId={navigatedTokenId} />
    }
  }

  function incrementAndPush() {
    incrementId()
    router.push(`/${navigatedTokenId + 1}`)
  }

  function decrementAndPush() {
    decrementId()
    router.push(`/${navigatedTokenId - 1}`)
  }

  return (
    <>
      {renderContent()}
      <>
        <button disabled={isFirstToken} onClick={decrementAndPush}>
          Backward
        </button>
        <button disabled={isLastToken} onClick={incrementAndPush}>
          Forward
        </button>
      </>
    </>
  )
}
