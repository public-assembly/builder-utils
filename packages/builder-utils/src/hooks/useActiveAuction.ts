import * as React from 'react'
import { useDaoAuctionQuery } from './useDaoAuctionQuery'
import { Hex } from '../types'
import { auctionAbi } from '../abi'
import { formatEther, parseUnits } from 'viem'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { useAuctionContext } from '../context'

export function useActiveAuction(tokenAddress: Hex): any {
  const { activeAuction } = useDaoAuctionQuery({ tokenAddress: tokenAddress })

  const { auctionState, auctionAddress } = useAuctionContext()

  const minBidAmount = React.useMemo(() => {
    if (
      activeAuction?.highestBidPrice?.chainTokenPrice?.decimal &&
      activeAuction?.minBidIncrementPercentage
    ) {
      const minBidValue =
        ((Number(activeAuction?.highestBidPrice.chainTokenPrice.raw) *
          activeAuction?.minBidIncrementPercentage) %
          100) +
        activeAuction?.highestBidPrice.chainTokenPrice.raw
      return Number(formatEther(BigInt(minBidValue)))
    } else {
      return activeAuction?.reservePrice?.chainTokenPrice?.decimal as number
    }
  }, [
    activeAuction?.highestBidPrice?.chainTokenPrice?.decimal,
    activeAuction?.minBidIncrementPercentage,
    activeAuction?.reservePrice?.chainTokenPrice?.decimal,
  ])

  const [bidAmount, setBidAmount] = React.useState('0')
  const [isValidBid, setIsValidBid] = React.useState(false)

  const updateBidAmount = React.useCallback(
    (value: string) => {
      let newValue: BigInt
      try {
        newValue = parseUnits(`${Number(value)}`, 18)
        if (+value >= minBidAmount) {
          setIsValidBid(true)
        } else {
          setIsValidBid(false)
        }
        const bidString = newValue.toString()
        setBidAmount(bidString)
      } catch (e) {
        console.error(e)
        return
      }
    },
    [setBidAmount, minBidAmount]
  )

  const { config: createBidConfig } = usePrepareContractWrite({
    address: auctionAddress,
    abi: auctionAbi,
    functionName: 'createBid',
    args: [BigInt(auctionState.tokenId)],
    value: BigInt(bidAmount),
    enabled: isValidBid,
  })

  const {
    data: createBidData,
    write: createBid,
    isError: createBidError,
  } = useContractWrite(createBidConfig)

  const {
    data: createBidTx,
    isLoading: createBidLoading,
    isSuccess: createBidSuccess,
  } = useWaitForTransaction({
    hash: createBidData?.hash,
  })

  return {
    minBidAmount,
    updateBidAmount,
    createBid,
    isValidBid,
    createBidSuccess,
    createBidError,
    createBidLoading,
    createBidTx,
    auctionState,
    auctionAddress,
  }
}
