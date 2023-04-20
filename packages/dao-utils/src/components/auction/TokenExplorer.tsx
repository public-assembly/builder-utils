import * as React from 'react'
import CurrentAuction from './CurrentAuction'
import TokenRenderer from './TokenRenderer'
import CircleArrow from './CircleArrow'
import { useAuctionContext, useTokenContext } from '../../context'

export interface TokenExplorerProps extends React.HTMLProps<HTMLDivElement> {
  tokenAddress: `0x${string}`
  auctionRenderer?: React.ReactNode
  tokenRenderer?: (tokenId: string) => React.ReactNode
  connectButton?: React.ReactNode
}

export default function TokenExplorer({
  tokenAddress,
  auctionRenderer,
  tokenRenderer,
  connectButton,
  ...props
}: TokenExplorerProps) {
  const { auctionState } = useAuctionContext()

  const tokenId = auctionState.tokenId.toNumber()

  const { tokenSettings } = useTokenContext()

  const totalSupply = tokenSettings?.[2].toNumber()

  const [currentTokenId, setCurrentTokenId] = React.useState<number>(tokenId)

  const incrementId = React.useCallback(() => {
    if (currentTokenId < tokenId) {
      setCurrentTokenId(currentTokenId + 1)
    }
  }, [auctionState, currentTokenId])

  const decrementId = React.useCallback(() => {
    if (currentTokenId > 0) {
      setCurrentTokenId(currentTokenId - 1)
    }
  }, [auctionState, currentTokenId])

  const renderContent = () => {
    if (totalSupply && tokenId === totalSupply - 1) {
      return (
        auctionRenderer || (
          <CurrentAuction tokenAddress={tokenAddress} connectButton={connectButton} />
        )
      )
    } else {
      return tokenRenderer ? (
        tokenRenderer(currentTokenId.toString())
      ) : (
        <TokenRenderer tokenAddress={tokenAddress} tokenId={currentTokenId.toString()} />
      )
    }
  }

  return (
    <div {...props} className="flex flex-col gap-2">
      {auctionState.tokenId ? (
        <>
          {renderContent()}
          <div className="flex flex-row gap-1">
            <button
              onClick={decrementId}
              className={`${tokenId === 0 && 'pointer-events-none opacity-20'}`}>
              <CircleArrow direction="backward" />
            </button>
            <button
              onClick={incrementId}
              className={`${
                totalSupply &&
                tokenId === totalSupply - 1 &&
                'pointer-events-none opacity-20'
              }`}>
              <CircleArrow />
            </button>
          </div>
        </>
      ) : (
        <p className="animate-pulse">Loading...</p>
      )}
    </div>
  )
}
