import React, { useContext, useEffect, useState } from 'react'
import type { PropsWithChildren } from 'react'
import { useContractReads } from 'wagmi'
import { tokenAbi } from '../abi'
import { useManagerContext } from './ManagerProvider'
import { Hex } from 'viem'

type TokenName =
  | { error: Error; result?: undefined; status: 'failure' }
  | { error?: undefined; result: string; status: 'success' }

type TokenSymbol =
  | { error: Error; result?: undefined; status: 'failure' }
  | { error?: undefined; result: string; status: 'success' }

type TotalSupply =
  | { error: Error; result?: undefined; status: 'failure' }
  | { error?: undefined; result: bigint; status: 'success' }

export interface TokenReturnTypes {
  tokenAddress: Hex
  tokenSettings: [TokenName, TokenSymbol, TotalSupply] | undefined
}

const TokenContext = React.createContext({} as TokenReturnTypes)

export function TokenProvider({ children }: PropsWithChildren) {
  const { tokenAddress } = useManagerContext()

  const tokenContract = {
    address: tokenAddress,
    abi: tokenAbi,
    chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
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
