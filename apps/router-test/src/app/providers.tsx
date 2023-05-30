'use client'

import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import * as React from 'react'
import { WagmiConfig } from 'wagmi'
import { Hex } from 'viem'
import { ManagerProvider } from '@public-assembly/builder-utils'
import { chains, config } from '../wagmi'

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains}>
        <ManagerProvider tokenAddress={process.env.NEXT_PUBLIC_TOKEN_ADDRESS as Hex}>
          {mounted && children}
        </ManagerProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
