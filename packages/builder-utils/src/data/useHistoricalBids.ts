import { useState, useEffect } from 'react'
import { Hex, Hash, parseAbiItem, formatEther } from 'viem'
import { viemClient } from '../viem/client'
import { useDaoTokenQuery } from '../hooks'
import { useManagerContext } from '../context'
import { etherscanLink } from '../lib'

export type AuctionEvent = {
  id: bigint
  bidder: string
  amount: string
  transactionHash: string
}

export function useHistoricalBids({
  tokenId,
  tokenAddress,
}: {
  tokenAddress: Hex
  tokenId: string
}) {
  const { auctionAddress } = useManagerContext()

  const { tokenData } = useDaoTokenQuery({
    tokenId: tokenId,
    tokenAddress: tokenAddress,
  })

  const [winningBid, setWinningBid] = useState<string | undefined>()
  const [winningTx, setWinningTx] = useState<string | undefined>()
  const [address, setAddress] = useState<string | undefined>()
  const [bidEvents, setBidEvents] = useState<AuctionEvent[] | undefined>()

  useEffect(() => {
    if (!tokenData) return
    // prettier-ignore
    (async () => {
      try {
        const fetchedEvents = await viemClient?.getLogs({
          address: auctionAddress,
          event: parseAbiItem(
            'event AuctionBid(uint256 tokenId, address bidder, uint256 amount, bool extended, uint256 endTime)'
          ),
          fromBlock: BigInt(tokenData?.mintInfo?.mintContext?.blockNumber),
          toBlock: 'latest',
        })

        const bidEventsArray = fetchedEvents?.map((event) => {
          return {
            id: event.args?.tokenId,
            bidder: event.args?.bidder as string,
            amount: formatEther(event.args?.amount),
            transactionHash: event.transactionHash as string,
          }
        })
        const bidEvents = bidEventsArray?.filter((token) => token?.id === BigInt(tokenId))

        setBidEvents(bidEvents)

        if (bidEvents?.length) {
          const lastTokenEvent = bidEvents.at(-1)
          setAddress(lastTokenEvent?.bidder)
          setWinningBid(`${lastTokenEvent?.amount}`)
          setWinningTx(etherscanLink({ hash: lastTokenEvent?.transactionHash }))
        } else {
          setWinningBid('N/A')
          setWinningTx(undefined)
        }
      } catch (error) {
        console.log(error)
      }
    })()
  }, [tokenData])

  return { winningBid, winningTx, address, bidEvents }
}
