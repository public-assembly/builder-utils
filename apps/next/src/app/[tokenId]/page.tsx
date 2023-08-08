'use client'

import { AuctionSkeleton } from '../../components/AuctionSkeleton'

export default function Page({ params }: { params: { tokenId: string } }) {
  return (
    <>
      <AuctionSkeleton tokenId={params.tokenId} />
    </>
  )
}
