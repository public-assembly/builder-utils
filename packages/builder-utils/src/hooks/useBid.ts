import * as React from 'react'
import { etherscanLink } from '../lib'
import { useDaoTokenQuery } from './useDaoTokenQuery'
import { useAuctionContext } from '../context'
import { getContract } from 'wagmi/actions'
import { Hex, Hash, parseAbiItem } from 'viem'
import { auctionAbi } from '../abi'
import { client } from '../viem/client'

export type AuctionEvent = {
  id: number
  bidder: Hex
  amount: string
  transactionHash: Hash
}

export const useBid = async ({
  tokenId,
  tokenAddress,
}: {
  tokenAddress: Hex
  tokenId: string
}) => {
  const { auctionAddress } = useAuctionContext()

  const { tokenData } = useDaoTokenQuery({
    tokenId: tokenId,
    tokenAddress: tokenAddress,
  })

  const [winningBid, setWinningBid] = React.useState<string | undefined>()
  const [winningTx, setWinningTx] = React.useState<string | undefined>()
  const [address, setAddress] = React.useState<string | undefined>()
  const [tokenEvents, setTokenEvents] = React.useState<AuctionEvent[]>()

  const logs = await client.getLogs({
    address: auctionAddress,
    event: parseAbiItem(
      'event AuctionBid(uint256 tokenId, address bidder, uint256 amount, bool extended, uint256 endTime)'
    ),
    fromBlock: BigInt(tokenData?.mintInfo?.mintContext?.blockNumber),
    toBlock: 'latest',
  })

  // React.useEffect(() => {
  //   async function getBids() {
  //     try {
  //       if (tokenData?.mintInfo?.mintContext?.blockNumber) {
  //         /**
  //          * https://docs.ethers.io/v5/api/contract/contract/#Contract-queryFilter
  //          * Used to query the Auction events exposed below:
  //          * https://github.com/ourzora/nouns-protocol/blob/main/src/auction/IAuction.sol#L16-L22
  //          */
  //         const bids = await auctionContract?.queryFilter(
  //           'AuctionBid' as any,
  //           tokenData?.mintInfo?.mintContext?.blockNumber,
  //           'latest' /* Clamp at next token block number if decrementing */
  //         )
  //         if (bids) {
  //           const auctionEventsArray = bids.map((event: any) => {
  //             return {
  //               id: parseInt(event.args?.tokenId?._hex, 16),
  //               bidder: event.args?.bidder as string,
  //               amount: ethers.utils.formatEther(event.args?.amount),
  //               transactionHash: event.transactionHash as string,
  //             }
  //           }) as AuctionEvent[]

  //           const tokenEvents = auctionEventsArray?.filter(
  //             (token) => token?.id === Number(tokenId)
  //           )

  //           setTokenEvents(tokenEvents)

  //           if (tokenEvents?.length) {
  //             const lastTokenEvent = tokenEvents.at(-1)
  //             setAddress(lastTokenEvent?.bidder)
  //             setWinningBid(`${lastTokenEvent?.amount}`)
  //             setWinningTx(etherscanLink({ hash: lastTokenEvent?.transactionHash }))
  //           } else {
  //             setWinningBid('N/A')
  //             setWinningTx(undefined)
  //           }
  //         }
  //       }
  //     } catch (err) {}
  //   }
  //   getBids()

  //   return function cleanup() {}
  // }, [tokenData, tokenId])
  // return { winningBid, winningTx, address, tokenEvents }
}
