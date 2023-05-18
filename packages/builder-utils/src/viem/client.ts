import { createPublicClient, http } from 'viem'
import { mainnet, goerli } from 'viem/chains'
import type { PublicClient } from 'viem'

export const mainnetClient: PublicClient = createPublicClient({
  batch: {
    multicall: true,
  },
  chain: mainnet,
  transport: http(process.env.NEXT_PUBLIC_MAINNET_ALCHEMY_ENDPOINT),
})

export const goerliClient: PublicClient = createPublicClient({
  batch: {
    multicall: true,
  },
  chain: goerli,
  transport: http(process.env.NEXT_PUBLIC_GOERLI_ALCHEMY_ENDPOINT),
})

export const viemClient: PublicClient | undefined =
  process.env.NEXT_PUBLIC_CHAIN_ID == '5' ? goerliClient : mainnetClient
