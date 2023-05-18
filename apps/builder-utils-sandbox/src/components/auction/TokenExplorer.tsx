import * as React from 'react'
import CurrentAuction from './CurrentAuction'
import TokenRenderer from './TokenRenderer'
import CircleArrow from './CircleArrow'
import { useTokenContext, useTokenExplorer } from '@public-assembly/builder-utils'
import { Hex } from 'viem'

export interface TokenExplorerProps extends React.HTMLProps<HTMLDivElement> {
  tokenAddress: Hex
  connectButton?: React.ReactNode
}

export default function TokenExplorer({
  tokenAddress,
  connectButton,
  ...props
}: TokenExplorerProps) {
  const { tokenId, currentTokenId, incrementId, decrementId, isLastToken } =
    useTokenExplorer()

  const { tokenSettings } = useTokenContext()

  const totalSupply = Number(tokenSettings?.[2])

  const renderContent = () => {
    if (isLastToken) {
      return <CurrentAuction tokenAddress={tokenAddress} tokenId={tokenId.toString()} />
    } else {
      return (
        <TokenRenderer tokenAddress={tokenAddress} tokenId={currentTokenId.toString()} />
      )
    }
  }

  return (
    <div {...props} className="flex flex-col gap-2">
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
            totalSupply && tokenId === totalSupply - 1 && 'pointer-events-none opacity-20'
          }`}>
          <CircleArrow />
        </button>
      </div>
    </div>
  )
}
