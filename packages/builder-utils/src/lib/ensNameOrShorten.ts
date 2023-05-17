import * as React from 'react'
import { Hex } from 'viem'
import { normalize } from 'viem/ens'
import { viemClient } from '../viem/client'
import { shortenAddress } from './shortenAddress'

export const ensNameOrShorten = async (address: Hex) => {
  const ensName = await viemClient?.getEnsAddress({
    name: normalize(address),
  })

  const ensNameOrShorten = () => (ensName ? ensName : shortenAddress(address))
  return {
    ensNameOrShorten,
  }
}
