/* @ts-ignore */
import * as React from 'react'
import CurrentAuction from './CurrentAuction'
import TokenRenderer from './TokenRenderer'
import CircleArrow from './CircleArrow'
import { useAuctionContext } from '../../context'

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

  console.log('Current token id', tokenId)

  const [currentTokenId, setCurrentTokenId] = React.useState<number>(tokenId || 0)

  console.log('Current token state', currentTokenId)

  React.useEffect(() => {
    if (tokenId && tokenId > 0) {
      setCurrentTokenId(tokenId)
    }
  }, [tokenId])

  const incrementId = React.useCallback(() => {
    if (tokenId && tokenId < currentTokenId - 1) {
      setCurrentTokenId(currentTokenId + 1)
    }
  }, [currentTokenId, tokenId])

  const decrementId = React.useCallback(() => {
    if (tokenId && tokenId > 0) {
      setCurrentTokenId(currentTokenId - 1)
    }
  }, [currentTokenId, tokenId])

  return (
    <div {...props} className="flex flex-col gap-2">
      {tokenId === currentTokenId ? (
        <>
          {auctionRenderer || (
            <CurrentAuction tokenAddress={tokenAddress} connectButton={connectButton} />
          )}
        </>
      ) : (
        <>
          {tokenRenderer ? (
            tokenRenderer(tokenId.toString())
          ) : (
            <TokenRenderer tokenAddress={tokenAddress} tokenId={tokenId.toString()} />
          )}
        </>
      )}
      <div className="flex flex-row gap-1">
        <button
          onClick={decrementId}
          className={`${tokenId === 0 && 'pointer-events-none opacity-20'}`}>
          <CircleArrow direction="backward" />
        </button>
        <button
          onClick={incrementId}
          className={`${
            tokenId === currentTokenId - 1 && 'pointer-events-none opacity-20'
          }`}>
          <CircleArrow />
        </button>
      </div>
    </div>
  )
}
