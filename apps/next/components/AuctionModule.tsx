import React from 'react'
import { TokenExplorer } from '@public-assembly/dao-utils'

export default function AuctionModule({ address }: { address: string }) {
  return <TokenExplorer tokenAddress={address} />
}
