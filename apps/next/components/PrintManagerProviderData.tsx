import { RawDisplayer } from './RawDisplayer'
import { useManagerContext, useGovernorContext } from '@public-assembly/dao-utils'

export function PrintManagerProviderData() {
  const { daoAddresses } = useManagerContext()
  const { proposalDetails } = useGovernorContext()
  return (
    <>
      <RawDisplayer data={daoAddresses} />
      <RawDisplayer data={proposalDetails} />
    </>
  )
}
