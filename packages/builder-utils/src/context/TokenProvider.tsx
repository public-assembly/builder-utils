import React, { useContext, useEffect, useState } from 'react'
import type { PropsWithChildren } from 'react'
import { tokenAbi } from '../abi'
import { useManagerContext } from './ManagerProvider'
import { Hex } from 'viem'
import { viemClient } from '../viem/client'

export interface TokenReturnTypes {
  tokenAddress?: Hex
  tokenSettings?: [string, string, BigInt]
}

const TokenContext = React.createContext({} as TokenReturnTypes)

export function TokenProvider({ children }: PropsWithChildren) {
  const [tokenSettings, setTokenSettings] = useState()
  const { tokenAddress } = useManagerContext()

  const tokenContract = {
    address: tokenAddress as Hex,
    abi: tokenAbi,
  }

  useEffect(() => {
    // prettier-ignore
    (async () => {
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
    })()
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
