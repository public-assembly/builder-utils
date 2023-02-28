/* @ts-ignore */
import * as React from 'react'
import { ConnectButton as RKConnectButton } from '@rainbow-me/rainbowkit'
import { Avatar } from './Avatar'

export default function Connect({
  connectCopy,
  ...props
}: {
  connectCopy?: string | JSX.Element
}) {
  return (
    <div className="relative" {...props}>
      <RKConnectButton.Custom>
        {({ account, chain, openAccountModal, openConnectModal, mounted }) => {
          return (
            <>
              {(() => {
                if (!mounted || !account || !chain) {
                  return (
                    <button className="connect__button" onClick={openConnectModal}>
                      {connectCopy ? connectCopy : 'Connect Wallet'}
                    </button>
                  )
                }
                if (chain.unsupported) {
                  return <p>&#x26A0; Wrong Network</p>
                }
                return (
                  <button onClick={openAccountModal}>
                    <div className="flex items-center gap-2 text-sm">
                      <Avatar />
                      {account.displayName}
                    </div>
                  </button>
                )
              })()}
            </>
          )
        }}
      </RKConnectButton.Custom>
    </div>
  )
}
