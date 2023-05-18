import { createConfig, configureChains } from 'wagmi'
import { mainnet, optimism, arbitrum, goerli, sepolia } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY

const { publicClient, webSocketPublicClient } = configureChains(
  [mainnet, goerli],
  [alchemyProvider({ apiKey: alchemyKey as string }), publicProvider()]
)

export const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
})
