import * as React from 'react'
import CurrentAuction from './CurrentAuction'
import TokenRenderer from './TokenRenderer'
import CircleArrow from './CircleArrow'
import { useTokenContext } from '../../context'
import { HexString } from '../../types'
import { useTokenExplorer } from '../../hooks'

export interface TokenExplorerProps extends React.HTMLProps<HTMLDivElement> {
  tokenAddress: HexString
  connectButton?: React.ReactNode
}

export default function TokenExplorer({
  tokenAddress,
  connectButton,
  ...props
}: TokenExplorerProps) {
  const { auctionState, tokenId, currentTokenId, incrementId, decrementId } =
    useTokenExplorer()

  const { tokenSettings } = useTokenContext()

  const totalSupply = tokenSettings?.[2].toNumber()

  const renderContent = () => {
    if (totalSupply && tokenId === totalSupply - 1) {
      return <CurrentAuction tokenAddress={tokenAddress} connectButton={connectButton} />
    } else {
      return (
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
