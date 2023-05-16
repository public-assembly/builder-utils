import React, { useContext, useEffect, useState } from 'react'
import { metadataAbi } from '../abi'
import { useManagerContext } from './ManagerProvider'
import { Hex } from 'viem'
import { viemClient } from '../viem/client'
import type { MetadataProviderProps, MetadataReturnTypes } from '../types'

const MetadataContext = React.createContext({} as MetadataReturnTypes)

export function MetadataProvider({ children }: MetadataProviderProps) {
  const [metadataSettings, setMetadataSettings] = useState()

  const { tokenAddress, daoAddresses } = useManagerContext()

  const metadataAddress = React.useMemo(
    () => daoAddresses?.metadataAddress as Hex,
    [daoAddresses]
  )

  useEffect(() => {
    async function getSettings() {
      try {
        const fetchedSettings = await viemClient?.readContract({
          address: metadataAddress,
          abi: metadataAbi,
          functionName: 'settings',
        })
        // @ts-ignore
        setMetadataSettings(fetchedSettings)
      } catch (error) {
        console.error(error)
      }
    }
    getSettings()
  }, [tokenAddress])

  return (
    <MetadataContext.Provider
      value={{
        tokenAddress,
        metadataAddress,
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
