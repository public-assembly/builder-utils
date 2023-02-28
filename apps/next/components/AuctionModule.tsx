import React from 'react'
import { TokenExplorer } from '@public-assembly/dao-utils'
import Connect from './Connect'

export default function AuctionModule({ address, ...props }: { address: `0x${string}` }) {
  return <TokenExplorer tokenAddress={address} connectButton={Connect({ ...props })} />
}
