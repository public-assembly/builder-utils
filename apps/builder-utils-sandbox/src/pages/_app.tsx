import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ManagerProvider, AuctionProvider } from '@public-assembly/builder-utils'
import { WagmiConfig } from 'wagmi'
import { config } from '../wagmi'
import dynamic from 'next/dynamic'

type ManagerProviderProps = {
  tokenAddress: `0x${string}`
  children: React.ReactNode
}

type AuctionProviderProps = {
  children: React.ReactNode
}

interface DynamicManagerProviderProps extends ManagerProviderProps {
  // Define any additional props that you want to pass to the ManagerProvider
}

// const DynamicManagerProvider = dynamic(
//   () => import('@public-assembly/builder-utils').then((module) => module.ManagerProvider),
//   {
//     ssr: false,
//   }
// ) as React.FC<DynamicManagerProviderProps>

interface DynamicWagmiConfigProps {
  config: any
  children: React.ReactNode
}

const DynamicWagmiConfig = dynamic(
  () => import('wagmi').then((module) => module.WagmiConfig),
  {
    ssr: false,
  }
) as React.FC<DynamicWagmiConfigProps>

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      {/* <DynamicManagerProvider tokenAddress={'0xd2e7684cf3e2511cc3b4538bb2885dc206583076'}> */}
      <ManagerProvider tokenAddress="0xd2e7684cf3e2511cc3b4538bb2885dc206583076">
        {/* <AuctionProvider> */}
        <Component {...pageProps} />
        {/* </AuctionProvider> */}
      </ManagerProvider>
      {/* </DynamicManagerProvider> */}
    </WagmiConfig>
  )
}
