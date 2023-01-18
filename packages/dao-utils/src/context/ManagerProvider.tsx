import * as React from 'react'
import { useContractRead } from 'wagmi'
import type { GetContractResult } from '@wagmi/core'
import { managerAbi, auctionAbi } from '../abi'

export interface ManagerProviderProps {
  children?: React.ReactNode
  tokenAddress?: string
}

export interface ManagerReturnTypes {
  tokenAddress?: string
  daoAddresses: {
    metadataAddress: string
    auctionAddress: GetContractResult<typeof auctionAbi> | string
    treasuryAddress: string
    governorAddress: string
  }
}

const ManagerContext = React.createContext({} as ManagerReturnTypes)

export function ManagerProvider({ children, tokenAddress }: ManagerProviderProps) {
  const managerProxyAddress = '0xd310A3041dFcF14Def5ccBc508668974b5da7174'

  const { data: getAddresses } = useContractRead({
    addressOrName: managerProxyAddress,
    contractInterface: managerAbi,
    functionName: 'getAddresses',
    args: [tokenAddress],
  })

  const daoAddresses = React.useMemo(() => {
    return {
      metadataAddress: getAddresses?.metadata,
      auctionAddress: getAddresses?.auction,
      treasuryAddress: getAddresses?.treasury,
      governorAddress: getAddresses?.governor,
    }
  }, [getAddresses])

  return (
    <ManagerContext.Provider value={{ tokenAddress, daoAddresses }}>
      {children}
    </ManagerContext.Provider>
  )
}

// Access the context value of the ManagerProvider
export function useManagerProvider() {
  return React.useContext(ManagerContext)
}
