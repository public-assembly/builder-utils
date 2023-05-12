import * as React from 'react'
import { useEnsName } from 'wagmi'
import { Hex } from 'viem'
import { shortenAddress } from '../lib/shortenAddress'

export function useBidder(address?: Hex) {
  const { data: ensName } = useEnsName({
    address: address as Hex | undefined,
  })

  const bidder = React.useMemo(
    () => (ensName ? ensName : shortenAddress(address)),
    [ensName, address]
  )

  return {
    bidder,
  }
}
