/* @ts-ignore */
import * as React from 'react'
import { useAccount } from 'wagmi'
import Connect from './Connect'

export default function AuthCheck({
  formUI,
  connectCopy,
}: {
  formUI?: JSX.Element
  connectCopy?: string | JSX.Element
}) {
  const { isConnected } = useAccount()
  return <div>{!isConnected ? <Connect connectCopy={connectCopy} /> : formUI}</div>
}
