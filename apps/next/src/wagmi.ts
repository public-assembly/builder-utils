import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig, Chain } from 'wagmi'
import { goerli, mainnet, zoraTestnet, zora } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

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

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, goerli, zoraTestnet, zora, base],
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'My wagmi + RainbowKit App',
  projectId: '57383c91ed88bb5edb9e5faeb1b67d1e',
  chains,
})

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export { chains }
