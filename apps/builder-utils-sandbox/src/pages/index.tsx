import Image from 'next/image'
import { AuctionSkeleton } from '@/components/AuctionSkeleton'
import {
  useAuctionState,
  useAuctionSettings,
  useHistoricalBids,
  useContractOwner,
} from '@public-assembly/builder-utils'
import { Hex } from 'viem'
import { CurrentAuction } from '@/components/CurrentAuction'

export default function Home() {
  const { auctionSettings } = useAuctionSettings()

  const { winningBid, winningTx, address, filteredBidEvents } = useHistoricalBids({
    tokenId: '119',
    tokenAddress: process.env.NEXT_PUBLIC_TOKEN_ADDRESS as Hex,
  })

  const { auctionState } = useAuctionState()

  const { contractOwner } = useContractOwner()

  return (
    <>
      <AuctionSkeleton />
      <h1>{contractOwner}</h1>
    </>
  )
}
