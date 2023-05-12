import React, { useContext } from 'react'
import { useContractRead } from 'wagmi'
import { metadataAbi } from '../abi'
import { useManagerContext } from './ManagerProvider'
import { Hex } from 'viem'
import type { MetadataProviderProps, MetadataReturnTypes } from '../types'

const MetadataContext = React.createContext({} as MetadataReturnTypes)

export function MetadataProvider({ children }: MetadataProviderProps) {
  const { tokenAddress, daoAddresses } = useManagerContext()

  const metadataAddress = React.useMemo(
    () => daoAddresses?.metadataAddress as Hex,
    [daoAddresses]
  )

  const { data: metadataSettings } = useContractRead({
    address: metadataAddress,
    abi: metadataAbi,
    functionName: 'settings',
    chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
  })

  if (!metadataSettings) return null
  return (
    <MetadataContext.Provider
      value={{
        tokenAddress,
        metadataAddress,
        // @ts-ignore
        metadataSettings,
      }}>
      {children}
    </MetadataContext.Provider>
  )
}

// Access the context value of the MetadataProvider
export function useMetadataContext() {
  const context = useContext(MetadataContext)
  if (!context) {
    throw Error('useMetadataContext hook must be used within a MetadataProvider')
  }
  return context
}
