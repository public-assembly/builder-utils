import type { Chain } from 'viem'
import { mainnet, goerli } from 'viem/chains'

export const CHAIN = {
  1: mainnet,
  5: goerli,
}[process.env.NEXT_PUBLIC_CHAIN_ID || 1] as Chain
