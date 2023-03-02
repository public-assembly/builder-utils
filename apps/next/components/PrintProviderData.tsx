import { RawDisplayer } from './RawDisplayer'
import {
  useManagerContext,
  useMetadataContext,
  useTokenContext,
} from '@public-assembly/dao-utils'

export function PrintProviderData() {
  const { daoAddresses } = useManagerContext()
  const { metadataSettings } = useMetadataContext()
  const { tokenSettings } = useTokenContext()

  return (
    <>
      <RawDisplayer data={daoAddresses} />
      <div>
        <RawDisplayer data={metadataSettings?.contractImage} />
        <RawDisplayer data={metadataSettings?.description} />
        <RawDisplayer data={metadataSettings?.projectURI} />
      </div>
      <div>
        <RawDisplayer data={tokenSettings?.[0]} />
        <RawDisplayer data={tokenSettings?.[1]} />
        <RawDisplayer data={tokenSettings?.[2]} />
      </div>
    </>
  )
}
