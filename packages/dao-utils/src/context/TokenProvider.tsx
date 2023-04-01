import React, { useContext } from 'react'
import { useContractReads } from 'wagmi'
import { tokenAbi } from '../abi'
import { useManagerContext } from './ManagerProvider'
import type { TokenProviderProps, TokenReturnTypes } from '../types'

const TokenContext = React.createContext({} as TokenReturnTypes)

export function TokenProvider({ children }: TokenProviderProps) {
  const { tokenAddress } = useManagerContext()

  const tokenContract = {
    address: tokenAddress,
    abi: tokenAbi,
  }

  const { data: tokenSettings } = useContractReads({
    contracts: [
      {
        ...tokenContract,
        functionName: 'name',
      },
      {
        ...tokenContract,
        functionName: 'symbol',
      },
      {
        ...tokenContract,
        functionName: 'totalSupply',
      },
    ],
  })

  return (
    <TokenContext.Provider
      value={{
        tokenAddress,
        // @ts-ignore
        tokenSettings,
      }}>
      {children}
    </TokenContext.Provider>
  )
}

// Access the context value of the TokenProvider
export function useTokenContext() {
  const context = useContext(TokenContext)
  if (!context) {
    throw Error('useTokenContext hook must be used within a TokenProvider')
  }
  return context
}
