import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {
  ManagerProvider,
  AuctionProvider,
  MetadataProvider,
  GovernorProvider,
  TokenProvider,
} from '@public-assembly/builder-utils'
import { Hex } from 'viem'
import { WagmiConfig } from 'wagmi'
import { config } from '../wagmi'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <ManagerProvider tokenAddress={process.env.NEXT_PUBLIC_TOKEN_ADDRESS as Hex}>
        <GovernorProvider>
          <AuctionProvider>
            <TokenProvider>
              <MetadataProvider>
                <Component {...pageProps} />
              </MetadataProvider>
            </TokenProvider>
          </AuctionProvider>
        </GovernorProvider>
      </ManagerProvider>
    </WagmiConfig>
  )
}
