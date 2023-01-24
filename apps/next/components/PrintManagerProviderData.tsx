import { RawDisplayer } from './RawDisplayer'
import { useManagerProvider } from '@public-assembly/dao-utils'

export function PrintManagerProviderData() {
  const { daoAddresses } = useManagerProvider()
  console.log('DAO Addresses:', daoAddresses)
  return <RawDisplayer data={daoAddresses} />
}
