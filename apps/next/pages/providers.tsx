import { Seo } from '@/components/Seo'
import { ManagerProvider } from '@public-assembly/dao-utils'
import { PrintManagerProviderData } from '../components'

function Providers() {
  const tokenAddress = '0x8983ec4b57dbebe8944af8d4f9d3adbafea5b9f1' as `0x${string}`
  return (
    <section className="max-w-[1240px] m-auto px-4 gap-8 flex flex-col">
      <Seo title="providers" />
      <div className="bg-slate-300 p-4 rounded-2xl text-black">
        <ManagerProvider tokenAddress={tokenAddress}>
          <PrintManagerProviderData />
        </ManagerProvider>
      </div>
    </section>
  )
}

export default Providers
