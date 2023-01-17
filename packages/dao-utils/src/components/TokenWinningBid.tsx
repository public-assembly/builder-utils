import * as React from 'react'
import { useNounsProtocol } from '../hooks/useNounsProtocol'
import { useAuctionProvider } from '../context'
import { ethers } from 'ethers'
import { etherscanLink } from '../lib'

export type AuctionEvent = {
  id: number
  bidder: string
  amount: string
  transactionHash: string
}

export default function TokenWinningBid() {
  const { auctionData, tokenAddress, tokenData, tokenId } = useAuctionProvider()

  const { BuilderAuction } = useNounsProtocol({
    tokenAddress: tokenAddress,
    auctionAddress: auctionData?.address,
  })

  const [winningBid, setWinningBid] = React.useState<string | undefined>('N/A')
  const [winningTx, setWinningTx] = React.useState<string | undefined>()

  React.useEffect(() => {
    async function getBids() {
      try {
        if (tokenData?.mintInfo?.mintContext?.blockNumber) {
          /**
           * https://docs.ethers.io/v5/api/contract/contract/#Contract-queryFilter
           * Used to query the Auction events exposed below:
           * https://github.com/ourzora/nouns-protocol/blob/main/src/auction/IAuction.sol#L16-L22
           */
          const bids = await BuilderAuction?.queryFilter(
            'AuctionBid' as any,
            tokenData?.mintInfo?.mintContext?.blockNumber,
            'latest' /* Clamp at next token block number if decrementing */
          )
          if (bids) {
            const auctionEventsArray = bids.map((event: any) => {
              return {
                id: parseInt(event.args?.tokenId?._hex, 16),
                bidder: event.args?.bidder as string,
                amount: ethers.utils.formatEther(event.args?.amount),
                transactionHash: event.transactionHash as string,
              }
            }) as AuctionEvent[]

            const tokenEvents = auctionEventsArray?.filter(
              (token) => token?.id === Number(tokenId)
            )

            if (tokenEvents?.length) {
              const lastTokenEvent = tokenEvents.at(-1)
              setWinningBid(`${lastTokenEvent?.amount} ETH`)
              setWinningTx(etherscanLink({ hash: lastTokenEvent?.transactionHash }))
            } else {
              setWinningBid('N/A')
              setWinningTx(undefined)
            }
          }
        }
      } catch (err) {
        // console.error(err)
      }
    }
    getBids()

    return function cleanup() {
      /**
       * Short circuit the async call:
       * https://stackoverflow.com/questions/37624144/is-there-a-way-to-short-circuit-async-await-flow
       */
      // console.log('unmount')
    }
  }, [BuilderAuction, tokenId, tokenData])

  return (
    <a
      href={`https://etherscan.io/`}
      target="_blank"
      rel="noreferrer"
      className="flex flex-col leading-5">
      <span className="opacity-50">Winning bid:</span>
      <a
        href={winningTx}
        target="_blank"
        rel="noreferrer"
        className={`${!winningTx && 'pointer-events-none'} hover:underline`}>
        {winningBid}
      </a>
    </a>
  )
}
