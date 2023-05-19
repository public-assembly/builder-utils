import * as React from 'react'
import { useDaoAuctionQuery } from '../graphql/hooks/useDaoAuctionQuery'
import { useManagerContext } from '../context'
import { formatEther, parseUnits, Hex } from 'viem'

export function useMinBidAmount() {
  const { tokenAddress } = useManagerContext()
  const { activeAuction } = useDaoAuctionQuery({ tokenAddress: tokenAddress })

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

  return {
    minBidAmount,
    bidAmount,
    setBidAmount,
    updateBidAmount,
    isValidBid,
  }
}
