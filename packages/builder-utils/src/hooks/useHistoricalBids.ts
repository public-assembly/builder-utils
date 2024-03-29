import { useState, useEffect } from 'react'
import { Hex, Hash, parseAbiItem, formatEther } from 'viem'
import { viemClient } from '../viem/client'
import { useManagerContext } from '../context'
import { etherscanLink } from '../lib'
import { useHistoricalTokenQuery } from '../subgraph'

export type AuctionEvent = {
  id: number
  bidder: Hex
  amount: string
  transactionHash: Hash
}

export function useHistoricalBids({
  tokenId,
  tokenAddress,
}: {
  tokenAddress: Hex
  tokenId: string
}) {
  const { auctionAddress } = useManagerContext()

  const { mintedAtRaw } = useHistoricalTokenQuery({
    tokenAddress,
    tokenId: BigInt(tokenId),
  })

  const [winningBid, setWinningBid] = useState<string | undefined>()
  const [winningTx, setWinningTx] = useState<string | undefined>()
  const [address, setAddress] = useState<string | undefined>()
  const [filteredBidEvents, setFilteredBidEvents] = useState<AuctionEvent[] | undefined>()

  useEffect(() => {
    if (!mintedAtRaw) return
    // prettier-ignore
    (async () => {
      try {
        /**
         * Return all `AuctionBid` events from the block during which it was minted until now
         */
        const fetchedBidEvents = await viemClient?.getLogs({
          address: auctionAddress,
          event: parseAbiItem(
            'event AuctionBid(uint256 tokenId, address bidder, uint256 amount, bool extended, uint256 endTime)'
          ),
          fromBlock: mintedAtRaw as bigint,
          toBlock: 'latest',
        })
        /**
         * Grab and format the `tokenId`, `bidder`, `amount`, and `transactionHash` of each bid
         */
        const prettyBidEvents = fetchedBidEvents?.map((event) => {
          return {
            id: Number(event.args?.tokenId),
            bidder: event.args?.bidder as Hex,
            amount: formatEther(event.args?.amount as bigint),
            transactionHash: event.transactionHash as Hash,
          }
        })
        /**
         * Filter bids given the `tokenId` supplied as an argument to this hook
         */
        const filteredBidEvents = prettyBidEvents?.filter((token) => token.id == Number(tokenId))

        setFilteredBidEvents(filteredBidEvents)

        if (filteredBidEvents?.length) {
          const lastTokenEvent = filteredBidEvents.at(-1)
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
  }, [mintedAtRaw])

  return { winningBid, winningTx, address, filteredBidEvents }
}
