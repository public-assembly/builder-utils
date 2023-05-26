import React, { useContext } from 'react'
import type { PropsWithChildren } from 'react'
import { useContractRead } from 'wagmi'
import { metadataAbi } from '../abi'
import { useManagerContext } from './ManagerProvider'
import { Hex } from 'viem'

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
  const { tokenAddress, metadataAddress } = useManagerContext()

  const { data: metadataSettings } = useContractRead({
    address: metadataAddress as Hex,
    abi: metadataAbi,
    functionName: 'settings',
  })

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
