import { createPublicClient, Transport } from 'viem'
import { CHAIN } from './viemChain'

const transport =
  `http://${CHAIN}.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}` as unknown as Transport

export const client = createPublicClient({
  batch: {
    multicall: true,
  },
  chain: CHAIN,
  transport,
})
