import { Chain } from '../types'

export const CHAIN = {
  1: Chain.Mainnet,
  5: Chain.Goerli,
}[process.env.NEXT_PUBLIC_CHAIN_ID || 1]
