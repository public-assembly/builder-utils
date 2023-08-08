import React, { createContext, useContext } from 'react'
import type { PropsWithChildren } from 'react'
import { useContractRead } from 'wagmi'
import { managerAbi } from '../abi'
import { Hex } from 'viem'

export interface ManagerProviderProps {
  tokenAddress: Hex
}

export interface ManagerReturnTypes {
  tokenAddress: Hex
  metadataAddress?: Hex
  auctionAddress?: Hex
  treasuryAddress?: Hex
  governorAddress?: Hex
}

const ManagerContext = createContext<ManagerReturnTypes | undefined>(undefined)

const MANAGER_PROXY_ADDRESS = {
  1: '0xd310a3041dfcf14def5ccbc508668974b5da7174',
  5: '0x0E9F3382Cf2508E3bc83248B5b4707FbA86D7Ee0',
  999: '0xC521f85613985b7E417FCcd5b348F64263D79397',
  7777777: '0x3ac0e64fe2931f8e082c6bb29283540de9b5371c',
  8453: '0x3ac0e64fe2931f8e082c6bb29283540de9b5371c',
}[process.env.NEXT_PUBLIC_CHAIN_ID || 1]

export function ManagerProvider({
  children,
  tokenAddress,
}: PropsWithChildren<ManagerProviderProps>) {
  const { data: daoAddresses } = useContractRead({
    address: MANAGER_PROXY_ADDRESS as Hex,
    abi: managerAbi,
    functionName: 'getAddresses',
    args: [tokenAddress],
    chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
  })

  const value = {
    tokenAddress,
    metadataAddress: daoAddresses?.[0],
    auctionAddress: daoAddresses?.[1],
    treasuryAddress: daoAddresses?.[2],
    governorAddress: daoAddresses?.[3],
  }

  return <ManagerContext.Provider value={value}>{children}</ManagerContext.Provider>
}

// Access the context value of the ManagerProvider
export const useManagerContext = () => {
  const context = useContext(ManagerContext)
  if (!context) {
    throw Error('useManagerContext hook must be used within a ManagerProvider')
  }
  return context
}
