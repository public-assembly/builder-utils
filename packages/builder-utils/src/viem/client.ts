import { createPublicClient, http } from 'viem'
import { mainnet, goerli } from 'viem/chains'

export const mainnetClient = createPublicClient({
  batch: {
    multicall: true,
  },
  chain: mainnet,
  transport: http(
    `http://mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`
  ),
})

export const goerliClient = createPublicClient({
  batch: {
    multicall: true,
  },
  chain: goerli,
  transport: http(
    `http://goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`
  ),
})
