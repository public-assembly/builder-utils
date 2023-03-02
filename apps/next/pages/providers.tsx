import { Seo } from '@/components/Seo'
import {
  ManagerProvider,
  GovernorProvider,
  MetadataProvider,
} from '@public-assembly/dao-utils'
import dynamic from 'next/dynamic'
import { PrintProviderData } from '../components'

const DynamicManagerProvider = dynamic(
  () => import('@public-assembly/dao-utils').then((module) => module.ManagerProvider),
  {
    ssr: false,
  }
)

function Providers() {
  const tokenAddress = '0xdf9b7d26c8fc806b1ae6273684556761ff02d422' as `0x${string}`

  return (
    <section className="max-w-[1240px] m-auto px-4 gap-8 flex flex-col">
      <Seo title="providers" />
      <div className="p-4 text-black bg-slate-300 rounded-2xl">
        <DynamicManagerProvider tokenAddress={tokenAddress}>
          <GovernorProvider>
            <MetadataProvider>
              <PrintProviderData />
            </MetadataProvider>
          </GovernorProvider>
        </DynamicManagerProvider>
      </div>
    </section>
  )
}

export default Providers
