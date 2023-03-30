import * as React from 'react'
import { useDaoAuctionQuery } from './useDaoAuctionQuery'
import { BigNumber as EthersBN, ContractTransaction, utils } from 'ethers'
import { useBidder } from './useBidder'
import { useNounsProtocol } from './useNounsProtocol'
import { HexString, AuctionData } from '../types'

export function useActiveAuction(
  /**
   * Nounish NFT Contract address
   */
  tokenAddress: HexString
) {
  const { activeAuction } = useDaoAuctionQuery({ tokenAddress: tokenAddress })

  const { bidder } = useBidder(activeAuction?.highestBidder as string)

  const minBidAmount = React.useMemo(() => {
    if (
      activeAuction?.highestBidPrice?.chainTokenPrice?.decimal &&
      activeAuction?.minBidIncrementPercentage
    ) {
      const minBidValue = EthersBN.from(
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

  const { auctionContract, tokenContract } = useNounsProtocol({
    tokenAddress: tokenAddress,
    auctionAddress: auctionData?.address,
    // metadataRendererAddress: auctionData?.metadata,
  })

  const [totalSupply, setTotalSupply] = React.useState<number>()

  React.useEffect(() => {
    async function getSupply() {
      try {
        const supply = await tokenContract?.totalSupply()
        setTotalSupply(supply?.toNumber())
      } catch (err) {
        console.error(err)
      }
    }
    getSupply()
  }, [tokenContract, auctionData?.tokenId])

  const [createBidSuccess, setCreateBidSuccess] = React.useState(false)
  const [createBidLoading, setCreateBidLoading] = React.useState(false)
  const [createBidError, setCreateBidError] = React.useState<unknown>()
  const [createBidTx, setCreateBidTx] = React.useState<ContractTransaction | undefined>()
  const [isValidBid, setIsValidBid] = React.useState(false)

  const [bidAmount, setBidAmount] = React.useState('0')

  const updateBidAmount = React.useCallback(
    (value: string) => {
      let newValue: EthersBN
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

  const createBid = React.useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (auctionData?.tokenId) {
        setCreateBidLoading(true)
        try {
          /* @ts-ignore */
          const tx = await auctionContract?.createBid(auctionData.tokenId, {
            value: bidAmount,
          })
          setCreateBidTx(tx)
          setCreateBidSuccess(true)
        } catch (err: unknown) {
          setCreateBidError(err)
          console.error(err)
        } finally {
          setCreateBidLoading(false)
        }
      }
    },
    [auctionContract, auctionData?.tokenId, bidAmount]
  )

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
