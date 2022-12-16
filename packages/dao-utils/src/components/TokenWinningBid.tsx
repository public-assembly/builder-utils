import React from 'react'
import { useDaoToken } from '@dao-auction/hooks/useDaoToken'
import { useNounsProtocol } from '@dao-auction/hooks/useNounsProtocol'
import { useActiveAuction } from '@dao-auction/hooks/useActiveAuction'
import { ethers } from 'ethers'
import { etherscanLink } from '../lib'

export default function TokenWinningBid({
  tokenId,
  daoAddress,
}: {
  daoAddress: string
  tokenId: string
}) {
  const { auctionData } = useActiveAuction(daoAddress)

  const { tokenData } = useDaoToken({
    daoAddress: daoAddress,
    tokenId: tokenId,
  })

  const { BuilderAuction } = useNounsProtocol({
    daoAddress: daoAddress,
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
            const auctionEventsArray = bids.map((event) => {
              return {
                id: parseInt(event.args?.tokenId?._hex, 16),
                bidder: event.args?.bidder,
                amount: ethers.utils.formatEther(event.args?.amount),
                transactionHash: event.transactionHash,
              }
            })

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
