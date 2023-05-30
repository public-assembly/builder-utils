import { useSettle, useAuctionState } from '@public-assembly/builder-utils'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function SettleAuction() {
  const { settle, settleLoading, settleSuccess } = useSettle()
  const { auctionState } = useAuctionState()
  const router = useRouter()

  useEffect(() => {
    if (settleSuccess) {
      router.push(`/${auctionState.tokenId + 1}`)
    }
  }, [settleSuccess])

  return (
    <button disabled={settleLoading} onClick={() => settle?.()}>
      Settle auction
    </button>
  )
}
