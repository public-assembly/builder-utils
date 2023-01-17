/* @ts-ignore */
import * as React from 'react'
import { useAuctionProvider } from '../context'

export default function TokenTitle({
  tokenId,
  daoAddress,
  externalLinkBaseURI = 'https://nouns.build/dao',
}: {
  daoAddress: string
  tokenId: string
  /**
   * External link base url
   * @default 'https://nouns.build/dao'
   */
  externalLinkBaseURI?: string
}) {
  const { tokenData } = useDaoToken({
    daoAddress: daoAddress,
    tokenId: tokenId,
  })

  return (
    <a
      href={`${externalLinkBaseURI}/${daoAddress}/${tokenId}`}
      target="_blank"
      rel="noreferrer"
      className="font-bold text-[24px] hover:underline flex flex-row items-center gap-2">
      <span>{tokenData?.metadata?.name}</span>
      <div className="w-[20px] h-[20px]">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15.3227 16.0689V8.45115H16.7475V17.5H2.5V3.19018H11.5094V4.62119H3.92484V16.0689L15.3227 16.0689ZM15.0678 3.93101H13.1751V2.5H17.5V6.84382H16.0752V4.94291L9.44042 11.6067L8.43305 10.5948L15.0678 3.93101Z"
            fill="black"
          />
        </svg>
      </div>
    </a>
  )
}
