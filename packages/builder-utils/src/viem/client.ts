import { createPublicClient, http } from 'viem'
import { mainnet, goerli, zoraTestnet, zora } from 'viem/chains'
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

export const zoraMainnetClient: PublicClient = createPublicClient({
  batch: {
    multicall: true,
  },
  chain: zora as Chain,
  transport: http('https://rpc.zora.co/'),
})

export const base = {
  id: 8453,
  network: 'base',
  name: 'Base',
  nativeCurrency: { name: 'Base', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://developer-access-mainnet.base.org'],
    },
    public: {
      http: ['https://developer-access-mainnet.base.org'],
    },
  },
  blockExplorers: {
    blockscout: {
      name: 'Basescout',
      url: 'https://base.blockscout.com',
    },
    default: {
      name: 'Basescan',
      url: 'https://basescan.org',
    },
    etherscan: {
      name: 'Basescan',
      url: 'https://basescan.org',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 5022,
    },
  },
} as const

export const baseMainnetClient: PublicClient = createPublicClient({
  batch: {
    multicall: true,
  },
  chain: base as Chain,
  transport: http('https://developer-access-mainnet.base.org'),
})

export const viemClient: PublicClient | undefined =
  process.env.NEXT_PUBLIC_CHAIN_ID == '5'
    ? goerliClient
    : process.env.NEXT_PUBLIC_CHAIN_ID == '1'
    ? mainnetClient
    : process.env.NEXT_PUBLIC_CHAIN_ID == '999'
    ? zoraTestnetClient
    : process.env.NEXT_PUBLIC_CHAIN_ID == '7777777'
    ? zoraMainnetClient
    : baseMainnetClient
