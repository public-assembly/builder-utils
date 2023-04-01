/* @ts-ignore */
import * as React from 'react'
import { useEnsName } from 'wagmi'
import { shortenAddress } from '../../lib/'

export default function Proposer({ proposal }) {
  const { data: ensName } = useEnsName({
    address: proposal?.proposer as `0x${string}` | undefined,
  })

  const proposer = React.useMemo(
    () => (ensName ? ensName : shortenAddress(proposal?.proposer)),
    [ensName, proposal?.proposer]
  )

  return <div>{proposer}</div>
}
