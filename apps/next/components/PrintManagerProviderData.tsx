import { RawDisplayer } from './RawDisplayer'
import { useManagerContext, useGovernorContext } from '@public-assembly/dao-utils'

export function PrintManagerProviderData() {
  const { daoAddresses } = useManagerContext()
  return (
    <>
      <RawDisplayer data={daoAddresses} />
    </>
  )
}
