import { useOwnedTokens } from '@public-assembly/dao-utils'

export default function ExampleHook({ address }: { address: string }) {
  const { tokens } = useOwnedTokens({ address: address })
  return (
    <pre className="py-[10px] overflow-x-scroll">
      <code>{JSON.stringify({ address, tokens }, null, 2)}</code>
    </pre>
  )
}
