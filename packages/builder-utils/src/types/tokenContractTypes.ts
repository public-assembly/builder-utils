import { Hex } from 'viem'

export interface TokenProviderProps {
  children?: React.ReactNode
}

export interface TokenReturnTypes {
  tokenAddress?: Hex
  tokenSettings?: [string, string, BigInt]
}
