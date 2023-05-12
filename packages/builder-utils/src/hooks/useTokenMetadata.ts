import { useState, useEffect } from 'react'
import { useDaoTokenQuery } from './useDaoTokenQuery'
import { useManagerContext } from '../context'
import { Hex } from 'viem'

export function useTokenMetadata(tokenId: string) {
  const { tokenAddress } = useManagerContext()

  const [tokenThumbnail, setTokenThumbnail] = useState<undefined | string>()
  const [tokenName, setTokenName] = useState<undefined | string>()

  const { tokenData } = useDaoTokenQuery({
    tokenAddress: tokenAddress as Hex,
    tokenId: tokenId,
  })

  useEffect(() => {
    const name = tokenData?.metadata?.name
    if (name) {
      setTokenName(name)
    }
    const image = tokenData?.metadata?.image
    if (image) {
      setTokenThumbnail(image)
    }
  }, [tokenData])

  return {
    tokenName,
    tokenThumbnail,
  }
}
