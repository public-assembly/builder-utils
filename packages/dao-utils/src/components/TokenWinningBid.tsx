/* @ts-ignore */
import * as React from 'react'
import { useDaoToken } from '../hooks/useDaoToken'
import { ethers } from 'ethers'
import { Event } from '@ethersproject/contracts'
import { etherscanLink } from '../lib'
import { useContract } from 'wagmi'
import { auctionAbi } from '../abi'
import { useManagerContext } from '../context'
import { ALCHEMY_RPC_URL } from '../constants/rpc'

export type AuctionEvent = {
  id: number
  bidder: string
  amount: string
  transactionHash: string
}

export default function TokenWinningBid({
  tokenId,
  tokenAddress,
}: {
  tokenAddress: `0x${string}`
  tokenId: string
}) {
  const { daoAddresses } = useManagerContext()

  const auctionContract = useContract({
    // address: daoAddresses?.auctionAddress,
    address: '0x4DD53079026017300C2489B91ceA62fFbe39ec19',
    abi: auctionAbi,
    signerOrProvider: new ethers.providers.StaticJsonRpcProvider(ALCHEMY_RPC_URL),
  })

  console.log('Auction contract', auctionContract)

  const { tokenData } = useDaoToken({
    tokenAddress: tokenAddress,
    tokenId: tokenId,
  })

  const [winningBid, setWinningBid] = React.useState<string | undefined>('N/A')
  const [winningTx, setWinningTx] = React.useState<string | undefined>()

  console.log(winningBid)

  React.useEffect(() => {
    async function getBids() {
      try {
        if (tokenData?.mintInfo?.mintContext?.blockNumber) {
          /**
           * https://docs.ethers.io/v5/api/contract/contract/#Contract-queryFilter
           * Used to query the Auction events exposed below:
           * https://github.com/ourzora/nouns-protocol/blob/main/src/auction/IAuction.sol#L16-L22
           */
          const bids = await auctionContract?.queryFilter(
            'AuctionBid' as any,
            tokenData?.mintInfo?.mintContext?.blockNumber,
            'latest' /* Clamp at next token block number if decrementing */
          )
          if (bids) {
            const auctionEventsArray = bids.map((event: Event) => {
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
        console.error(err)
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
  }, [auctionContract, tokenId, tokenData])

  return (
    <div className="flex flex-col leading-5 text-[color:var(--pa-pink)]">
      <span className="opacity-50">Winning bid:</span>
      <a
        href={winningTx}
        target="_blank"
        rel="noreferrer"
        className={`${!winningTx && 'pointer-events-none'} hover:underline`}>
        {winningBid}
      </a>
    </div>
  )
}
