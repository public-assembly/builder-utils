import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import { AppWrapper } from '../components'
import dynamic from 'next/dynamic'
import { GovernorProvider, AuctionProvider } from '@public-assembly/builder-utils'

const DynamicManagerProvider = dynamic(
  () => import('@public-assembly/builder-utils').then((module) => module.ManagerProvider),
  {
    ssr: false,
  }
)

function App({ Component, pageProps }: AppProps) {
  const tokenAddress = process.env.NEXT_PUBLIC_TOKEN_ADDRESS as `0x${string}`

  return (
    <>
      <NextHead>
        <title>Public Assembly</title>
      </NextHead>
      <AppWrapper>
        <DynamicManagerProvider tokenAddress={tokenAddress}>
          <GovernorProvider>
            <AuctionProvider>
              <Component {...pageProps} />
            </AuctionProvider>
          </GovernorProvider>
        </DynamicManagerProvider>
      </AppWrapper>
    </>
  )
}
export default App
