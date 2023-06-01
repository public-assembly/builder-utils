import { auctionAbi } from '../abi'
import { useManagerContext } from '../context'
import { useContractReads } from 'wagmi'

type AuctionSettingResult =
  | { error: Error; result?: undefined; status: 'failure' }
  | { error?: undefined; result: bigint; status: 'success' }

export interface AuctionSettings {
  minBidIncrement: AuctionSettingResult
  reservePrice: AuctionSettingResult
  duration: AuctionSettingResult
}

export function useAuctionSettings() {
  const { auctionAddress } = useManagerContext()

  const auctionContract = {
    address: auctionAddress,
    abi: auctionAbi,
    chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
  }

  const { data: auctionSettings } = useContractReads({
    contracts: [
      {
        ...auctionContract,
        functionName: 'minBidIncrement',
      },
      {
        ...auctionContract,
        functionName: 'reservePrice',
      },
      {
        ...auctionContract,
        functionName: 'duration',
      },
    ],
  })

  return { auctionSettings }
}
