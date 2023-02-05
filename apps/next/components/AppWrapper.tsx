import '@rainbow-me/rainbowkit/styles.css'
import NextNProgress from 'nextjs-progressbar'
import { getDefaultWallets, RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit'
import { createClient, configureChains, WagmiConfig, mainnet, goerli } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { infuraProvider } from 'wagmi/providers/infura'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { SWRConfig } from 'swr'
import { Header } from './Header'
import { Footer } from './Footer'

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, goerli],
  [
    publicProvider(),
    // @ts-ignore
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY }),
    // @ts-ignore
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_KEY }),
  ]
)

const { connectors } = getDefaultWallets({
  appName: 'DAO utils - Sample App',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

export function AppWrapper({ children }: { children: JSX.Element }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        coolMode
        theme={lightTheme({
          accentColor: 'black',
          borderRadius: 'large',
        })}>
        <SWRConfig
          value={{
            fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
          }}>
          <NextNProgress
            color="#ff89de"
            startPosition={0.125}
            stopDelayMs={200}
            height={2}
            showOnShallow={true}
            options={{ showSpinner: false }}
          />
          <Header />
          <main>{children}</main>
          <Footer />
        </SWRConfig>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
