import { Seo } from '@/components/Seo'
import { ManagerProvider, useManagerProvider } from '@public-assembly/dao-utils'
import { RawDisplayer } from '../components'

function PrintManagerProviderData() {
  const { daoAddresses } = useManagerProvider()
  return <RawDisplayer data={daoAddresses} />
}

function Providers() {
  return (
    <section className="max-w-[1240px] m-auto px-4 gap-8 flex flex-col">
      <Seo title="providers" />
      <div className="bg-slate-300 p-4 rounded-2xl text-black">
        <ManagerProvider tokenAddress="0xdf9b7d26c8fc806b1ae6273684556761ff02d422">
          <PrintManagerProviderData />
        </ManagerProvider>
      </div>
    </section>
  )
}

export default Providers
