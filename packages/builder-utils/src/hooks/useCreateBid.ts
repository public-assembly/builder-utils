import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { Hex } from 'viem'
import { useManagerContext } from '../context'
import { auctionAbi } from '../abi'
import { useAuctionState } from './useAuctionState'

export function useCreateBid({ bidAmount }: { bidAmount: string }) {
  const { auctionAddress } = useManagerContext()
  const { auctionState } = useAuctionState()

  const { config: createBidConfig } = usePrepareContractWrite({
    address: auctionAddress as Hex,
    abi: auctionAbi,
    functionName: 'createBid',
    args: [BigInt(auctionState?.tokenId as number)],
    value: BigInt(bidAmount),
    chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
  })

  const {
    data: createBidData,
    write: createBid,
    isError: createBidError,
  } = useContractWrite(createBidConfig)

  const {
    data: createBidTx,
    isLoading: createBidLoading,
    isSuccess: createBidSuccess,
  } = useWaitForTransaction({
    hash: createBidData?.hash,
  })

  return {
    createBid,
    createBidSuccess,
    createBidError,
    createBidLoading,
    createBidTx,
  }
}
