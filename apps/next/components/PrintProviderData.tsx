import { RawDisplayer } from './RawDisplayer'
import {
  useManagerContext,
  useGovernorContext,
  useMetadataContext,
} from '@public-assembly/dao-utils'

export function PrintProviderData() {
  const { daoAddresses } = useManagerContext()
  const { settings } = useMetadataContext()

  console.log('Settings:', settings)

  return (
    <>
      <RawDisplayer data={daoAddresses} />
      <div>
        <RawDisplayer data={settings?.contractImage} />
        <RawDisplayer data={settings?.description} />
        <RawDisplayer data={settings?.projectURI} />
        {/* {settings?.description} */}
      </div>
    </>
  )
}
