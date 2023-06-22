import { Hex, formatEther } from 'viem'
import { useManagerContext } from '../context'
import { auctionAbi } from '../abi'
import { useContractRead } from 'wagmi'

export interface AuctionState {
  tokenId: number
  highestBid: string
  highestBidder: Hex
  startTime: number
  endTime: number
  settled: boolean
}

export function useAuctionState(): { auctionState: AuctionState } {
  const { auctionAddress } = useManagerContext()

  const { data: auctionState } = useContractRead({
    address: auctionAddress as Hex,
    abi: auctionAbi,
    functionName: 'auction',
    chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
  })

  return {
    auctionState: {
      tokenId: Number(auctionState?.[0]),
      highestBid: auctionState ? formatEther(auctionState?.[1] as bigint) : '',
      highestBidder: auctionState?.[2] as Hex,
      startTime: Number(auctionState?.[3]),
      endTime: Number(auctionState?.[4]),
      settled: Boolean(auctionState?.[5]),
    },
  }
}
