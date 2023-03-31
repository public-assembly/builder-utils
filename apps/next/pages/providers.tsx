import { Seo } from '@/components/Seo'
import { MetadataProvider, TokenProvider } from '@public-assembly/dao-utils'
import { PrintProviderData } from '../components'

function Providers() {
  return (
    <section className="max-w-[1240px] m-auto px-4 gap-8 flex flex-col">
      <Seo title="providers" />
      <div className="p-4 text-black bg-slate-300 rounded-2xl">
        <MetadataProvider>
          <TokenProvider>
            <PrintProviderData />
          </TokenProvider>
        </MetadataProvider>
      </div>
    </section>
  )
}

export default Providers
