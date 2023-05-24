import { useManagerContext } from '../context'
import { useContractRead } from 'wagmi'
import { tokenAbi } from '../abi'

export function useContractOwner() {
  const { tokenAddress } = useManagerContext()

  const { data: contractOwner } = useContractRead({
    address: tokenAddress,
    abi: tokenAbi,
    functionName: 'owner',
  })

  return {
    contractOwner,
  }
}
