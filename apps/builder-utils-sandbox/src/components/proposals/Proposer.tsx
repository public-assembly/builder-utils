import * as React from 'react'
import { useEnsName } from 'wagmi'
import { shortenAddress } from '@public-assembly/builder-utils'
import { Hex } from 'viem'
import { NounsProposal } from '@public-assembly/builder-utils'

export default function Proposer({ proposal }: { proposal: NounsProposal }) {
  // const { data: ensName } = useEnsName({
  //   address: proposal?.proposer as Hex | undefined,
  // })

  // const proposer = React.useMemo(
  //   () => (ensName ? ensName : shortenAddress(proposal?.proposer)),
  //   [ensName, proposal?.proposer]
  // )

  // {proposer}
  return <div></div>
}
