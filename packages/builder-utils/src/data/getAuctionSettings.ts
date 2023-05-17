import { Hex } from 'viem'
import { viemClient, mainnetClient } from '../viem/client'
import { auctionAbi } from '../abi'

export interface AuctionSettings {
  minBidIncrement: bigint
  reservePrice: bigint
}

export const getAuctionSettings = async ({ auctionAddress }: { auctionAddress: Hex }) => {
  const auctionContract = {
    address: auctionAddress,
    abi: auctionAbi,
  } as const

  const auctionSettings = await viemClient?.multicall({
    contracts: [
      {
        ...auctionContract,
        functionName: 'minBidIncrement',
      },
      {
        ...auctionContract,
        functionName: 'reservePrice',
      },
    ],
  })

  return { auctionSettings }
}
