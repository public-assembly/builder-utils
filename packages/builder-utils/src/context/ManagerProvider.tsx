import React, { createContext, useContext, useEffect, useState } from 'react'
import { managerAbi } from '../abi'
import { Hex } from 'viem'
import { viemClient } from '../viem/client'
import type { ManagerProviderProps, ManagerReturnTypes, DaoAddresses } from '../types'

const ManagerContext = createContext<ManagerReturnTypes | null>({
  tokenAddress: undefined,
  daoAddresses: undefined,
})

const MANAGER_PROXY_ADDRESS = {
  1: '0xd310a3041dfcf14def5ccbc508668974b5da7174',
  5: '0x0E9F3382Cf2508E3bc83248B5b4707FbA86D7Ee0',
}[process.env.NEXT_PUBLIC_CHAIN_ID || 1]

export function ManagerProvider({ children, tokenAddress }: ManagerProviderProps) {
  const [daoAddresses, setDaoAddresses] = useState<DaoAddresses>()

  useEffect(() => {
    ;(async () => {
      try {
        const fetchedAddresses = await viemClient?.readContract({
          address: MANAGER_PROXY_ADDRESS as Hex,
          abi: managerAbi,
          functionName: 'getAddresses',
          args: [tokenAddress],
        })
        // @ts-ignore
        setDaoAddresses(fetchedAddresses)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [tokenAddress])

  const value = { tokenAddress, daoAddresses }

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
