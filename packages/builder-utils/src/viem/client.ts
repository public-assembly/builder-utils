import { createPublicClient, http, Transport } from 'viem'
import { CHAIN } from './viemChain'

export const viemClient = createPublicClient({
  batch: {
    multicall: true,
  },
  chain: CHAIN,
  transport: http(process.env.NEXT_PUBLIC_ALCHEMY_ENDPOINT),
})
