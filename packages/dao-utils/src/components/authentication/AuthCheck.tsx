/* @ts-ignore */
import * as React from 'react'
import { useAccount } from 'wagmi'

export default function AuthCheck({
  formUI,
  connectCopy,
  connectButton,
}: {
  formUI?: JSX.Element
  connectCopy?: string | JSX.Element
  connectButton?: React.ReactNode
}) {
  const { isConnected } = useAccount()
  return <div>{!isConnected ? connectButton : formUI}</div>
}
