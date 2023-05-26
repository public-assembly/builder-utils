import { useManagerContext } from '../context'
import { auctionAbi } from '../abi'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'

export function useSettle() {
  const { auctionAddress } = useManagerContext()

  const { config: settleConfig } = usePrepareContractWrite({
    address: auctionAddress,
    abi: auctionAbi,
    functionName: 'settleCurrentAndCreateNewAuction',
  })

  const {
    data: settleData,
    write: settle,
    isError: settleError,
  } = useContractWrite(settleConfig)

  const {
    data: settleTx,
    isLoading: settleLoading,
    isSuccess: settleSuccess,
  } = useWaitForTransaction({
    hash: settleData?.hash,
  })

  return { settle, settleSuccess, settleError, settleLoading, settleTx }
}
