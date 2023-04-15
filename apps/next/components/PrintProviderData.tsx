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
      Contract Addresses:
      <RawDisplayer data={daoAddresses} />
      <div>
        Contract Image:
        <RawDisplayer data={metadataSettings?.contractImage} />
        Description:
        <RawDisplayer data={metadataSettings?.description} />
        Project URI:
        <RawDisplayer data={metadataSettings?.projectURI} />
      </div>
      {tokenSettings ? (
        <div>
          Name: <RawDisplayer data={tokenSettings?.[0]} />
          Symbol: <RawDisplayer data={tokenSettings?.[1]} />
          Total Supply:
          <RawDisplayer data={tokenSettings?.[2].toString()} />
        </div>
      ) : null}
    </>
  )
}
