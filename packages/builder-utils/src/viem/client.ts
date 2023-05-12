import { createPublicClient, http, Transport } from 'viem'
import { CHAIN } from '../constants/chain'

export const client = createPublicClient({
  batch: {
    multicall: true,
  },
  chain: CHAIN,
  transport:
    `http://${CHAIN}.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}` as unknown as Transport,
})
