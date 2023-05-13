import * as React from 'react'
import { useEnsName } from 'wagmi'
import { shortenAddress } from '../../lib'
import { Hex } from 'viem'

export default function Proposer({ proposal }) {
  const { data: ensName } = useEnsName({
    address: proposal?.proposer as Hex | undefined,
  })

  const proposer = React.useMemo(
    () => (ensName ? ensName : shortenAddress(proposal?.proposer)),
    [ensName, proposal?.proposer]
  )

  return <div>{proposer}</div>
}
