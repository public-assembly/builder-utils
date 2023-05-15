import { createPublicClient, http } from 'viem'
import { mainnet, goerli } from 'viem/chains'
import type { PublicClient } from 'viem'

// const transport = http(
//   'https://eth-mainnet.g.alchemy.com/v2/HyBIR7u41CJW4xuFlKUPfxBU1pSFmOk1'
// )

export const mainnetClient: PublicClient = createPublicClient({
  batch: {
    multicall: true,
  },
  chain: mainnet,
  // transport: http(
  //   `http://mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`
  // ),
  transport: http(process.env.NEXT_PUBLIC_ALCHEMY_KEY),
  // transport,
})

export const goerliClient: PublicClient = createPublicClient({
  batch: {
    multicall: true,
  },
  chain: goerli,
  transport: http(
    `http://goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`
  ),
})
