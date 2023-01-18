import { RawDisplayer } from './RawDisplayer'
import { useManagerProvider } from '@public-assembly/dao-utils'

export function PrintManagerProviderData() {
  const { daoAddresses } = useManagerProvider()
  return <RawDisplayer data={daoAddresses} />
}
