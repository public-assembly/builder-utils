import * as React from 'react'
import { useDaoAuctionQuery } from './useDaoAuctionQuery'
import { BigNumber, utils } from 'ethers'
import { useBidder } from './useBidder'
import { HexString, AuctionData } from '../types'
import { tokenAbi, auctionAbi } from '../abi'
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { ethers } from 'ethers'
import { useManagerContext } from '../context'

export function useActiveAuction(tokenAddress: HexString) {
  const { activeAuction } = useDaoAuctionQuery({ tokenAddress: tokenAddress })

  const { bidder } = useBidder(activeAuction?.highestBidder as string)

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
      /* @ts-ignore */
      return activeAuction?.reservePrice?.chainTokenPrice?.decimal as number
    }
  }, [
    activeAuction?.highestBidPrice?.chainTokenPrice?.decimal,
    activeAuction?.minBidIncrementPercentage,
    activeAuction?.reservePrice?.chainTokenPrice?.decimal,
  ])

  /**
   * Fetch all of this directly from contract
   */
  const auctionData = React.useMemo<AuctionData>(() => {
    return {
      tokenId: activeAuction?.tokenId,
      address: activeAuction?.address,
      metadata: activeAuction?.metadata,
      duration: activeAuction?.duration,
      endTime: activeAuction?.endTime,
      highestBidder: bidder,
      highestBidPrice: activeAuction?.highestBidPrice?.chainTokenPrice?.decimal,
      highestBidPriceRaw: activeAuction?.highestBidPrice?.chainTokenPrice?.raw,
      minBidIncrement: activeAuction?.minBidIncrementPercentage,
      minBidAmount: minBidAmount,
      /* @ts-ignore */
      reservePrice: activeAuction?.reservePrice?.chainTokenPrice?.raw,
    }
  }, [activeAuction, bidder, minBidAmount])

  const [totalSupply, setTotalSupply] = React.useState<number>()

  useContractRead({
    address: tokenAddress,
    abi: tokenAbi,
    functionName: 'totalSupply',
    onSuccess(data) {
      setTotalSupply(data?.toNumber())
    },
  })

  /**
   * Bid state variables
   */
  const [bidAmount, setBidAmount] = React.useState('0')
  const [isValidBid, setIsValidBid] = React.useState(false)

  const updateBidAmount = React.useCallback(
    (value: string) => {
      let newValue: BigNumber
      try {
        newValue = utils.parseUnits(value, 18)
        if (+value >= auctionData?.minBidAmount) {
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
    [setBidAmount, auctionData?.minBidAmount]
  )

  const { daoAddresses } = useManagerContext()

  const [tokenId, setTokenId] = React.useState<string>('0')

  React.useEffect(() => {
    if (auctionData?.tokenId) {
      setTokenId(auctionData.tokenId)
    }
  }, [])

  const { config: createBidConfig } = usePrepareContractWrite({
    address: daoAddresses?.auctionAddress,
    abi: auctionAbi,
    functionName: 'createBid',
    args: [BigNumber.from(tokenId)],
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
    updateBidAmount,
    createBid,
    isValidBid,
    createBidSuccess,
    createBidError,
    createBidLoading,
    createBidTx,
    auctionData,
    totalSupply,
  }
}
