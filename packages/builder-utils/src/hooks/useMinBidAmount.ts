import * as React from 'react'
import { useCurrentAuctionQuery, useAuctionConfigQuery } from '../subgraph'
import { useManagerContext } from '../context'
import { formatEther, parseUnits } from 'viem'

export function useMinBidAmount() {
  const { tokenAddress } = useManagerContext()
  const { highestBid } = useCurrentAuctionQuery({ tokenAddress: tokenAddress })
  const { minimumBidIncrement } = useAuctionConfigQuery({ tokenAddress: tokenAddress })

  const minBidAmount = React.useMemo(() => {
    if (highestBid) {
      const minBidValue =
        (Number(highestBid) * (minimumBidIncrement / 100) + Number(highestBid)) * 1e18
      return Number(formatEther(BigInt(minBidValue)))
    } else {
      return Number(highestBid)
    }
  }, [highestBid, minimumBidIncrement])

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
    updateBidAmount,
    isValidBid,
  }
}
