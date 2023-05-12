import { createPublicClient, http, Transport } from 'viem'
import { CHAIN } from './viemChain'

export const client = createPublicClient({
  batch: {
    multicall: true,
  },
  chain: CHAIN,
  transport: http(process.env.ALCHEMY_ENDPOINT),
})
