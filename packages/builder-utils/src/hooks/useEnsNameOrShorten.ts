import { useState } from 'react'
import { Hex } from 'viem'
import { shortenAddress } from '../lib'
import { useEnsName } from 'wagmi'

export function useEnsNameOrShorten({ address }: { address: Hex }) {
  const [ensNameOrShorten, setEnsNameOrShorten] = useState<Hex | string>()

  const { isLoading: loadingEns } = useEnsName({
    address,
    onSuccess(data) {
      if (address)
        if (data === address) {
          setEnsNameOrShorten(shortenAddress(address))
        } else {
          setEnsNameOrShorten(data as string)
        }
    },
    onError(error) {
      console.log('Error', error)
    },
  })

  return { ensNameOrShorten, loadingEns }
}
