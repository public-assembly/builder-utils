import { useEffect, useState } from 'react'
import { Hex } from 'viem'
import { normalize } from 'viem/ens'
import { viemClient } from '../viem/client'
import { shortenAddress } from '../lib'

export function useEnsNameOrShorten({ address }: { address: Hex }) {
  const [ensNameOrShorten, setEnsNameOrShorten] = useState<Hex | string>()

  useEffect(() => {
    if (!address) return
    // prettier-ignore
    (async () => {
      try {
        const ensName = await viemClient?.getEnsAddress({
          name: normalize(address),
        })
        setEnsNameOrShorten(ensName ? ensName : shortenAddress(address))
      } catch (error) {
        console.log(error)
      }
    })()
  }, [address])

  return {
    ensNameOrShorten,
  }
}
