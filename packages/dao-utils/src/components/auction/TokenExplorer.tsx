import * as React from 'react'
import { useDaoCollectionQuery } from '../../hooks'
import CurrentAuction from './CurrentAuction'
import TokenRenderer from './TokenRenderer'
import CircleArrow from './CircleArrow'
import { useAuctionContext, useTokenContext } from '../../context'

export interface TokenExplorerProps extends React.HTMLProps<HTMLDivElement> {
  tokenAddress: `0x${string}`
  /**
   * Renderer component for current auction
   */
  auctionRenderer?: React.ReactNode
  /**
   * Renderer component for dao tokens
   */
  tokenRenderer?: (tokenId: string) => React.ReactNode
  /**
   * Component to handle wallet connection
   */
  connectButton?: React.ReactNode
}

export default function TokenExplorer({
  tokenAddress,
  auctionRenderer,
  tokenRenderer,
  connectButton,
  ...props
}: TokenExplorerProps) {
  const { tokenId } = useAuctionContext()

  const { tokenSettings } = useTokenContext()

  const totalSupply = tokenSettings?.[2].toNumber()

  const [currentTokenId, setCurrentTokenId] = React.useState(tokenId)

  const incrementId = React.useCallback(() => {
    if (currentTokenId < tokenId) {
      setCurrentTokenId(currentTokenId + 1)
    }
  }, [tokenId, currentTokenId])

  const decrementId = React.useCallback(() => {
    if (currentTokenId > 0) {
      setCurrentTokenId(currentTokenId - 1)
    }
  }, [tokenId, currentTokenId])

  const renderContent = () => {
    if (totalSupply && tokenId === totalSupply - 1) {
      return (
        auctionRenderer || (
          <CurrentAuction tokenAddress={tokenAddress} connectButton={connectButton} />
        )
      )
    } else {
      return tokenRenderer ? (
        tokenRenderer(tokenId.toString())
      ) : (
        <TokenRenderer tokenAddress={tokenAddress} tokenId={tokenId.toString()} />
      )
    }
  }

  return (
    <div {...props} className="flex flex-col gap-2">
      {tokenId ? (
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
