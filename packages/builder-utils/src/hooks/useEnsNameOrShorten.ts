import { useState } from 'react'
import { Hex } from 'viem'
import { shortenAddress } from '../lib'
import { useEnsName } from 'wagmi'

export function useEnsNameOrShorten({ address }: { address: Hex }) {
  const { data: ensName, isLoading: loadingEns } = useEnsName({
    address,
  })

  if (!ensName) return shortenAddress(address)
  return ensName
}
