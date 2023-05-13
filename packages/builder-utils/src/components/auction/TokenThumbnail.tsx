import * as React from 'react'
import { useDaoTokenQuery } from '../../hooks'
import { Hex } from 'viem'

export default function TokenThumbnail({
  tokenId,
  tokenAddress,
}: {
  tokenAddress: Hex
  tokenId: string
}) {
  const [thumbnail, setThumbnail] = React.useState<undefined | string>()

  const { tokenData } = useDaoTokenQuery({
    tokenAddress: tokenAddress,
    tokenId: tokenId,
  })

  React.useEffect(() => {
    const image = tokenData?.metadata?.image
    if (image) {
      setThumbnail(image)
    }
  }, [tokenData])

  return (
    <div className="aspect-square relative w-full">
      {thumbnail && <img src={thumbnail} className="w-full h-full inset-0" />}
    </div>
  )
}
