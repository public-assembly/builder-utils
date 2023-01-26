import * as React from 'react'
import { useContractRead } from 'wagmi'
import { managerAbi } from '../abi'

export interface ManagerProviderProps {
  children: React.ReactNode
  tokenAddress: `0x${string}`
}

export interface ManagerReturnTypes {
  tokenAddress?: `0x${string}`
  daoAddresses: {
    metadataAddress?: `0x${string}`
    auctionAddress?: `0x${string}`
    treasuryAddress?: `0x${string}`
    governorAddress?: `0x${string}`
  }
}

const ManagerContext = React.createContext({} as ManagerReturnTypes)

export function ManagerProvider({ children, tokenAddress }: ManagerProviderProps) {
  const managerProxyAddress = '0xd310A3041dFcF14Def5ccBc508668974b5da7174'

  const { data: getAddresses } = useContractRead({
    address: managerProxyAddress,
    abi: managerAbi,
    functionName: 'getAddresses',
    // args: [tokenAddress],
    args: ['0xd2E7684Cf3E2511cc3B4538bB2885Dc206583076'],
    onSuccess(getAddresses) {
      console.log(getAddresses)
    },
    onError(error) {
      console.log(error)
    },
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
