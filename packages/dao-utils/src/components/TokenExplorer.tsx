/* @ts-ignore */
import * as React from 'react'
import { useDaoCollectionQuery } from '../hooks'
import CurrentAuction from './CurrentAuction'
import TokenRenderer from './TokenRenderer'
import CircleArrow from './CircleArrow'

export interface TokenExplorerProps extends React.HTMLProps<HTMLDivElement> {
  /**
   * Nounish NFT Contract address
   */
  tokenAddress: `0x${string}`
  /**
   * Renderer Component for current auction
   */
  auctionRenderer?: React.ReactNode
  /**
   * Renderer Component for dao tokens
   */
  tokenRenderer?: React.ReactNode
  /**
   * Button to handle wallet connection
   */
  connectButton?: React.ReactNode
}

export default function TokenExplorer({
  tokenAddress,
  auctionRenderer,
  connectButton,
  ...props
}: TokenExplorerProps) {
  const { nftCount } = useDaoCollectionQuery({ tokenAddress: tokenAddress })

  const [tokenId, setTokenId] = React.useState(0)

  React.useEffect(() => {
    nftCount && setTokenId(nftCount - 1)
  }, [nftCount])

  const incrementId = React.useCallback(() => {
    if (nftCount && tokenId < nftCount - 1) {
      setTokenId(tokenId + 1)
    }
  }, [setTokenId, tokenId])

  const decrementId = React.useCallback(() => {
    if (nftCount && tokenId > 0) {
      setTokenId(tokenId - 1)
    }
  }, [setTokenId, tokenId])

  if (!nftCount) return null

  return (
    <div {...props} className="flex flex-col gap-2">
      {tokenId === nftCount - 1 ? (
        <>
          {auctionRenderer || (
            <CurrentAuction tokenAddress={tokenAddress} connectButton={connectButton} />
          )}
        </>
      ) : (
        <TokenRenderer tokenAddress={tokenAddress} tokenId={tokenId?.toString()!} />
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
