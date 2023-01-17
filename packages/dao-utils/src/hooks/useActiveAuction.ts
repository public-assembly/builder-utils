import * as React from 'react'
import { useDaoAuctionQuery } from './useDaoAuctionQuery'
import { BigNumber as EthersBN, ContractTransaction } from 'ethers'
import { parseUnits } from '@ethersproject/units'
import { useBidder } from './useBidder'
import { useNounsProtocol } from './useNounsProtocol'

export function useActiveAuction(
  /**
   * Nounish NFT Contract address
   */
  daoAddress: string
) {
  const { activeAuction } = useDaoAuctionQuery({ collectionAddress: daoAddress })

  const { bidder } = useBidder(activeAuction?.highestBidder as string)

  const minBidAmount = React.useMemo(() => {
    if (
      activeAuction?.highestBidPrice?.chainTokenPrice?.decimal &&
      activeAuction?.minBidIncrementPercentage
    ) {
      const minBidValue =
        activeAuction?.highestBidPrice.chainTokenPrice.decimal *
          (activeAuction?.minBidIncrementPercentage / 100) +
        activeAuction?.highestBidPrice.chainTokenPrice.decimal
      return minBidValue
    } else {
      /* @ts-ignore */
      return activeAuction?.reservePrice?.chainTokenPrice?.decimal as number
    }
  }, [activeAuction?.highestBidPrice?.chainTokenPrice?.decimal])

  /**
   * Fetch all of this directly from contract
   */
  const auctionData = React.useMemo(() => {
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

  const { BuilderAuction, BuilderToken } = useNounsProtocol({
    daoAddress: daoAddress,
    auctionAddress: auctionData?.address,
    metadataRendererAddress: auctionData?.metadata,
  })

  const [totalSupply, setTotalSupply] = React.useState<number | undefined>()

  React.useEffect(() => {
    async function getSupply() {
      try {
        const supply = await BuilderToken?.totalSupply()
        setTotalSupply(supply?.toNumber())
      } catch (err) {
        console.error(err)
      }
    }
    getSupply()
  }, [BuilderToken, auctionData?.tokenId])

  const [createBidSuccess, setCreateBidSuccess] = React.useState(false)
  const [createBidLoading, setCreateBidLoading] = React.useState(false)
  const [createBidError, setCreateBidError] = React.useState(false)
  const [createBidTx, setCreateBidTx] = React.useState<ContractTransaction | undefined>()
  const [isValidBid, setIsValidBid] = React.useState(false)

  const [bidAmount, setBidAmount] = React.useState('0')

  const updateBidAmount = React.useCallback(
    (value: string) => {
      let newValue: EthersBN
      try {
        newValue = parseUnits(value, 18)
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
    async (event: any) => {
      event.preventDefault()
      if (auctionData?.tokenId) {
        setCreateBidLoading(true)
        try {
          const tx = await BuilderAuction?.createBid(auctionData.tokenId, {
            value: bidAmount,
          })
          setCreateBidTx(tx)
          setCreateBidSuccess(true)
        } catch (err: any) {
          setCreateBidError(err)
          console.error(err)
        } finally {
          setCreateBidLoading(false)
        }
      }
    },
    [BuilderAuction, auctionData?.tokenId, bidAmount]
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
