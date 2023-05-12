import * as React from 'react'
import { useDaoAuctionQuery } from './useDaoAuctionQuery'
import { BigNumber, utils } from 'ethers'
import { HexString } from '../types'
import { auctionAbi } from '../abi'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { useAuctionContext } from '../context'

export function useActiveAuction(tokenAddress: HexString): any {
  const { activeAuction } = useDaoAuctionQuery({ tokenAddress: tokenAddress })

  const { auctionState, auctionAddress } = useAuctionContext()

  const minBidAmount = React.useMemo(() => {
    if (
      activeAuction?.highestBidPrice?.chainTokenPrice?.decimal &&
      activeAuction?.minBidIncrementPercentage
    ) {
      const minBidValue = BigNumber.from(
        activeAuction?.highestBidPrice.chainTokenPrice.raw
      )
        .mul(activeAuction?.minBidIncrementPercentage)
        .div(100)
        .add(activeAuction?.highestBidPrice.chainTokenPrice.raw)
      return Number(utils.formatEther(minBidValue))
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
      let newValue: BigNumber
      try {
        newValue = utils.parseUnits(value, 18)
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
    args: [BigNumber.from(auctionState.tokenId)],
    overrides: { value: BigNumber.from(bidAmount) },
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
