import '@rainbow-me/rainbowkit/styles.css'
import NextNProgress from 'nextjs-progressbar'
import { getDefaultWallets, RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit'
import { createConfig, configureChains, WagmiConfig } from 'wagmi'
import { mainnet, goerli } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { SWRConfig } from 'swr'
import { Header } from './Header'
import { Footer } from './Footer'

// @ts-ignore
const { chains, provider } = configureChains(
  [mainnet, goerli],
  [
    // @ts-ignore
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY }),
    publicProvider(),
  ]
)

const { connectors } = getDefaultWallets({
  appName: 'builder-utils sandbox',
  chains,
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  // @ts-ignore
  provider,
})

export function AppWrapper({ children }: { children: JSX.Element }) {
  return (
    <WagmiConfig config={wagmiConfig}>
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
