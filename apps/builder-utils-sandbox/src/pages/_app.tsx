import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {
  ManagerProvider,
  MetadataProvider,
  GovernorProvider,
  TokenProvider,
} from '@public-assembly/builder-utils'
import { Hex } from 'viem'
import { WagmiConfig } from 'wagmi'
import { config } from '../wagmi'
import dynamic from 'next/dynamic'

const DynamicManagerProvider = dynamic(
  () => import('@public-assembly/builder-utils').then((module) => module.ManagerProvider),
  {
    ssr: false,
  }
)

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <DynamicManagerProvider tokenAddress={process.env.NEXT_PUBLIC_TOKEN_ADDRESS as Hex}>
        <GovernorProvider>
          <TokenProvider>
            <MetadataProvider>
              <Component {...pageProps} />
            </MetadataProvider>
          </TokenProvider>
        </GovernorProvider>
      </DynamicManagerProvider>
    </WagmiConfig>
  )
}
