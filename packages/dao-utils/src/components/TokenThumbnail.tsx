/* @ts-ignore */
import * as React from 'react'
import { useAuctionProvider } from '../context'

export default function TokenThumbnail() {
  const [thumbnail, setThumbnail] = React.useState<undefined | string>()

  const { tokenData } = useAuctionProvider()

  React.useEffect(() => {
    const image = tokenData?.metadata?.image
    if (image) {
      setThumbnail(image)
    }
  }, [tokenData])

  return (
    <div className="aspect-square relative w-full bg-slate-50">
      {thumbnail && <img src={thumbnail} className="w-full h-full inset-0" />}
    </div>
  )
}
