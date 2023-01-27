import React, { createContext, PropsWithChildren, useContext, useEffect } from 'react'
import { useContractRead } from 'wagmi'
import { managerAbi } from '../abi'

type Hash = `0x${string}`

type ManagerProviderProps = PropsWithChildren<{
  tokenAddress: Hash
}>

type DaoAddresses = {
  metadataAddress: string
  auctionAddress: string
  treasuryAddress: string
  governorAddress: string
} | null

export type ManagerReturnTypes = {
  tokenAddress?: Hash
  daoAddresses: DaoAddresses
  isLoading: boolean
  isError: boolean
}

const ManagerContext = createContext<ManagerReturnTypes | null>({
  tokenAddress: undefined,
  daoAddresses: null,
  isLoading: false,
  isError: false,
})

export const ManagerProvider: React.FC<ManagerProviderProps> = ({
  children,
  tokenAddress,
}) => {
  const managerProxyAddress = '0xd310A3041dFcF14Def5ccBc508668974b5da7174'

  const [daoAddresses, setDaoAddress] = React.useState<DaoAddresses | null>(null)

  const {
    data: getAddresses,
    isLoading,
    isError,
  } = useContractRead({
    address: managerProxyAddress,
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
