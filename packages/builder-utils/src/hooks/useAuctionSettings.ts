import { useState, useEffect } from 'react'
import { viemClient } from '../viem/client'
import { auctionAbi } from '../abi'
import { useManagerContext } from '../context'

type AuctionSettingResult =
  | { error: Error; result?: undefined; status: 'failure' }
  | { error?: undefined; result: bigint; status: 'success' }

export interface AuctionSettings {
  minBidIncrement: AuctionSettingResult
  reservePrice: AuctionSettingResult
}

export function useAuctionSettings() {
  const [auctionSettings, setAuctionSettings] = useState<AuctionSettings>()

  const { auctionAddress } = useManagerContext()

  useEffect(() => {
    if (!auctionAddress) return
    // prettier-ignore
    (async () => {
      const auctionContract = {
        address: auctionAddress,
        abi: auctionAbi,
      } as const
      try {
        const fetchedAuctionSettings = await viemClient?.multicall({
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
        if (fetchedAuctionSettings) {
          setAuctionSettings({
              // @ts-ignore
              minBidIncrement: Number(fetchedAuctionSettings[0].result), 
              // @ts-ignore
              reservePrice: Number(fetchedAuctionSettings[1].result)
          });
      }
      } catch (error) {
        console.log(error)
      }
    })()
  }, [auctionAddress])

  return { auctionSettings }
}
