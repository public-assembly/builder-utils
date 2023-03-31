import React from 'react'
import { TokenExplorer } from '@public-assembly/dao-utils'
import Connect from './Connect'

export default function AuctionModule({
  tokenAddress,
  ...props
}: {
  tokenAddress: `0x${string}`
}) {
  return (
    <TokenExplorer tokenAddress={tokenAddress} connectButton={Connect({ ...props })} />
  )
}
