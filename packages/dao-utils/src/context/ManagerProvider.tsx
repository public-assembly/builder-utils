import React, { createContext, useContext, useEffect, memo } from 'react'
import { useContractRead } from 'wagmi'
import { managerAbi } from '../abi'
import type { ManagerProviderProps, ManagerReturnTypes, DaoAddresses } from '../types'

const ManagerContext = createContext<ManagerReturnTypes | null>({
  tokenAddress: undefined,
  daoAddresses: null,
})

// const MANAGER_PROXY_ADDRESS = '0xd310A3041dFcF14Def5ccBc508668974b5da7174'
// const GOERLI_MANAGER_ADDRESS = '0x785708d09b89C470aD7B5b3f8ac804cE72B6b282'
// const MANAGER_PROXY_ADDRESS = '0x785708d09b89C470aD7B5b3f8ac804cE72B6b282'

const MANAGER_PROXY_ADDRESS =
  process.env.NEXT_PUBLIC_CHAIN_ID == '5'
    ? '0x785708d09b89C470aD7B5b3f8ac804cE72B6b282'
    : '0xd310A3041dFcF14Def5ccBc508668974b5da7174'

export const ManagerProvider: React.FC<ManagerProviderProps> = memo(
  ({ children, tokenAddress }) => {
    const [daoAddresses, setDaoAddress] = React.useState<DaoAddresses | null>(null)

    const { data: getAddresses } = useContractRead({
      address: MANAGER_PROXY_ADDRESS,
      abi: managerAbi,
      functionName: 'getAddresses',
      args: [tokenAddress],
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

    const value = { tokenAddress, daoAddresses }

    return <ManagerContext.Provider value={value}>{children}</ManagerContext.Provider>
  }
)

// Access the context value of the ManagerProvider
export const useManagerContext = () => {
  const context = useContext(ManagerContext)
  if (!context) {
    throw Error('useManagerContext hook must be used within a ManagerProvider')
  }
  return context
}
