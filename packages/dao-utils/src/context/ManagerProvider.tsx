import React, { createContext, useContext, useEffect } from 'react'
import { useContractRead } from 'wagmi'
import { managerAbi } from '../abi'
import type { ManagerProviderProps, ManagerReturnTypes, DaoAddresses } from '../types'

const ManagerContext = createContext<ManagerReturnTypes | null>({
  tokenAddress: undefined,
  daoAddresses: null,
  isLoading: false,
  isError: false,
})

const MANAGER_PROXY_ADDRESS = '0xd310A3041dFcF14Def5ccBc508668974b5da7174'

export const ManagerProvider: React.FC<ManagerProviderProps> = ({
  children,
  tokenAddress,
}) => {
  const [daoAddresses, setDaoAddress] = React.useState<DaoAddresses | null>(null)

  const {
    data: getAddresses,
    isLoading,
    isError,
  } = useContractRead({
    address: MANAGER_PROXY_ADDRESS,
    abi: managerAbi,
    functionName: 'getAddresses',
    args: [tokenAddress],
    onSuccess(data: any) {
      console.log(data)
    },
    onError(error: any) {
      console.log(error)
    },
  })

  useEffect(() => {
    if (getAddresses) {
      setDaoAddress({
        metadataAddress: getAddresses?.metadata,
        auctionAddress: getAddresses?.auction,
        treasuryAddress: getAddresses?.treasury,
        governorAddress: getAddresses?.governor,
      })
    }
  }, [getAddresses])

  const value = { tokenAddress, daoAddresses, isLoading, isError }

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
