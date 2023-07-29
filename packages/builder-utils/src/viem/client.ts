import { createPublicClient, http } from 'viem'
import { mainnet, goerli, zoraTestnet } from 'viem/chains'
import type { PublicClient, Chain } from 'viem'

export const mainnetClient: PublicClient = createPublicClient({
  batch: {
    multicall: true,
  },
  chain: mainnet as Chain,
  transport: http(process.env.NEXT_PUBLIC_MAINNET_ALCHEMY_ENDPOINT),
})

export const goerliClient: PublicClient = createPublicClient({
  batch: {
    multicall: true,
  },
  chain: goerli as Chain,
  transport: http(process.env.NEXT_PUBLIC_GOERLI_ALCHEMY_ENDPOINT),
})

export const zoraTestnetClient: PublicClient = createPublicClient({
  batch: {
    multicall: true,
  },
  chain: zoraTestnet as Chain,
  transport: http('https://testnet.rpc.zora.co/'),
})

export const viemClient: PublicClient | undefined =
  process.env.NEXT_PUBLIC_CHAIN_ID == '5'
    ? goerliClient
    : process.env.NEXT_PUBLIC_CHAIN_ID == '1'
    ? mainnetClient
    : zoraTestnetClient
