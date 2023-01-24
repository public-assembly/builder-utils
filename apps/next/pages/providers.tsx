import { Seo } from '@/components/Seo'
import { ManagerProvider } from '@public-assembly/dao-utils'
import { PrintManagerProviderData } from '../components'

function Providers() {
  return (
    <section className="max-w-[1240px] m-auto px-4 gap-8 flex flex-col">
      <Seo title="providers" />
      <div className="bg-slate-300 p-4 rounded-2xl text-black">
        <ManagerProvider tokenAddress="0xd2E7684Cf3E2511cc3B4538bB2885Dc206583076">
          <PrintManagerProviderData />
        </ManagerProvider>
      </div>
    </section>
  )
}

export default Providers
