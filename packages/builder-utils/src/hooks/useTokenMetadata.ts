import parseBase64String from '../lib/parseBase64String'
import { tokenAbi } from '../abi'
import { useTokenContext } from '../context'
import { useEffect, useState } from 'react'
import { useContractRead } from 'wagmi'

type TokenMetadata = {
  description: string
  image: string
  name: string
  properties?: string
}

export function useTokenMetadata({ tokenId }: { tokenId: number }) {
  const [json, setJson] = useState<TokenMetadata>()

  const { tokenAddress } = useTokenContext()

  const { data: tokenUri } = useContractRead({
    address: tokenAddress,
    abi: tokenAbi,
    functionName: 'tokenURI',
    args: [BigInt(tokenId)],
  })

  useEffect(() => {
    if (tokenUri) {
      setJson(parseBase64String(tokenUri))
    }
  }, [tokenId])

  return {
    json: json as TokenMetadata,
  }
}
