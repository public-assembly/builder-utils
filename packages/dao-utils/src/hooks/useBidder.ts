import * as React from 'react'
import { useEnsName } from 'wagmi'
import { shortenAddress } from '../lib/shortenAddress'

export function useBidder(address?: string) {
  const { data: ensName } = useEnsName({
    address: address as string | undefined,
  })

  const bidder = React.useMemo(
    () => (ensName ? ensName : shortenAddress(address)),
    [ensName, address]
  )

  return {
    bidder,
  }
}
