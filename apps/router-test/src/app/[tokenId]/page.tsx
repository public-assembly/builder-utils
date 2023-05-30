'use client'

import { ConnectButton } from '../../components/ConnectButton'
import { AuctionSkeleton } from '../../components/AuctionSkeleton'

export function Page({ params }: { params: { tokenId: string } }) {
  return (
    <>
      <ConnectButton />
      <AuctionSkeleton tokenId={params.tokenId} />
    </>
  )
}

export default Page
