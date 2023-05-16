import React, { useContext, useEffect, useState } from 'react'
import { tokenAbi } from '../abi'
import { useManagerContext } from './ManagerProvider'
import { Hex } from 'viem'
import { viemClient } from '../viem/client'
import type { TokenProviderProps, TokenReturnTypes } from '../types'

const TokenContext = React.createContext({} as TokenReturnTypes)

export function TokenProvider({ children }: TokenProviderProps) {
  const [tokenSettings, setTokenSettings] = useState()
  const { tokenAddress } = useManagerContext()

  const tokenContract = {
    address: tokenAddress as Hex,
    abi: tokenAbi,
  }

  useEffect(() => {
    async function getTokenSettings() {
      try {
        const fetchedTokenSettings = await viemClient?.multicall({
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
        // @ts-ignore
        setTokenSettings(fetchedTokenSettings)
      } catch (error) {
        console.error(error)
      }
    }
    getTokenSettings()
  }, [])

  return (
    <TokenContext.Provider
      value={{
        tokenAddress,
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
