import { Seo } from '@/components/Seo'
import {
  GovernorProvider,
  MetadataProvider,
  TokenProvider,
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
  const tokenAddress = process.env.NEXT_PUBLIC_TOKEN_ADDRESS as `0x${string}`

  return (
    <section className="max-w-[1240px] m-auto px-4 gap-8 flex flex-col">
      <Seo title="providers" />
      <div className="p-4 text-black bg-slate-300 rounded-2xl">
        <DynamicManagerProvider tokenAddress={tokenAddress}>
          <GovernorProvider>
            <MetadataProvider>
              <TokenProvider>
                <PrintProviderData />
              </TokenProvider>
            </MetadataProvider>
          </GovernorProvider>
        </DynamicManagerProvider>
      </div>
    </section>
  )
}

export default Providers
