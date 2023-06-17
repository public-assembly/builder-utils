'use client'

import { useAuctionState } from '@public-assembly/builder-utils'
import Link from 'next/link'

export default function Page() {
  const { auctionState } = useAuctionState()

  return (
    <>
      <h1>Home</h1>
      {/* Recommended to use the <Link /> tag when navigating between routes */}
      <Link href={`/${auctionState.tokenId}`}>Go to auction</Link>
    </>
  )
}
