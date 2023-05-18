import React, { useContext, useEffect, useState } from 'react'
import type { PropsWithChildren } from 'react'
import { metadataAbi } from '../abi'
import { useManagerContext } from './ManagerProvider'
import { Hex } from 'viem'
import { viemClient } from '../viem/client'

export interface MetadataProviderProps {
  children?: React.ReactNode
}

type MetadataSettings =
  | readonly [`0x${string}`, string, string, string, string]
  | undefined

export interface MetadataReturnTypes {
  tokenAddress: Hex
  metadataAddress: Hex
  metadataSettings: MetadataSettings
}

const MetadataContext = React.createContext({} as MetadataReturnTypes)

export function MetadataProvider({ children }: PropsWithChildren): JSX.Element {
  const [metadataSettings, setMetadataSettings] = useState<MetadataSettings>()

  const { tokenAddress, metadataAddress } = useManagerContext()

  useEffect(() => {
    // prettier-ignore
    (async () => {
      if (!metadataAddress) return
      try {
        const fetchedMetadataSettings = await viemClient?.readContract({
          address: metadataAddress as Hex,
          abi: metadataAbi,
          functionName: 'settings',
        })
        setMetadataSettings(fetchedMetadataSettings)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [metadataAddress])

  if (!metadataSettings) return <></>
  return (
    <MetadataContext.Provider
      value={{
        tokenAddress,
        metadataAddress: metadataAddress as Hex,
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
