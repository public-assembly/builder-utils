import { WebThreeComponent } from '@public-assembly/dao-utils'
import ExampleHook from './ExampleHook'

export default function DynamicComponent({ address }: { address?: string }) {
  return (
    <>
      <WebThreeComponent />
      {address && <ExampleHook address={address} />}
    </>
  )
}
