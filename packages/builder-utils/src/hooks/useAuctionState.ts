import { auctionAbi } from '../abi'
import { viemClient } from '../viem/client'
import { Hex } from 'viem'

export const getAuctionState = async ({ auctionAddress }: { auctionAddress: Hex }) => {
  const auctionContract = {
    address: auctionAddress,
    abi: auctionAbi,
  }

  const auctionState = await viemClient?.multicall({
    contracts: [
      {
        ...auctionContract,
        functionName: 'auction',
      },
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

  return { auctionState }
}
