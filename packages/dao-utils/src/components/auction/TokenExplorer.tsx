/* @ts-ignore */
import * as React from 'react'
import { useDaoCollectionQuery } from '../../hooks'
import CurrentAuction from './CurrentAuction'
import TokenRenderer from './TokenRenderer'
import CircleArrow from './CircleArrow'

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
  const { nftCount } = useDaoCollectionQuery({ tokenAddress: tokenAddress })

  console.log(nftCount)

  const [tokenId, setTokenId] = React.useState(0)

  React.useEffect(() => {
    if (nftCount && nftCount > 0) {
      setTokenId(nftCount - 1)
    }
  }, [nftCount])

  const incrementId = React.useCallback(() => {
    if (nftCount && tokenId < nftCount - 1) {
      setTokenId(tokenId + 1)
    }
  }, [nftCount, tokenId])

  const decrementId = React.useCallback(() => {
    if (nftCount && tokenId > 0) {
      setTokenId(tokenId - 1)
    }
  }, [nftCount, tokenId])

  if (!nftCount) return <p className="animate-pulse">Loading...</p>
  return (
    <div {...props} className="flex flex-col gap-2">
      {tokenId === nftCount - 1 ? (
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
          className={`${tokenId === nftCount - 1 && 'pointer-events-none opacity-20'}`}>
          <CircleArrow />
        </button>
      </div>
    </div>
  )
}
