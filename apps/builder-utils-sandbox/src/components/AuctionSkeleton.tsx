import { useTokenExplorer } from '@public-assembly/builder-utils'
import { CurrentAuction } from './CurrentAuction'
import { HistoricalAuction } from './HistoricalAuction'

export function AuctionSkeleton() {
  const { currentTokenId, incrementId, decrementId, isFirstToken, isLastToken } =
    useTokenExplorer()

  const renderContent = () => {
    if (isLastToken) {
      return <CurrentAuction />
    } else {
      return <HistoricalAuction tokenId={currentTokenId} />
    }
  }

  return (
    <>
      {renderContent()}
      <>
        <button disabled={isFirstToken} onClick={decrementId}>
          Backward
        </button>
        <button disabled={isLastToken} onClick={incrementId}>
          Forward
        </button>
      </>
    </>
  )
}
