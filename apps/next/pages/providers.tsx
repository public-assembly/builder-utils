import { Seo } from '@/components/Seo'
import { ManagerProvider } from '@public-assembly/dao-utils'
import { isServerSide } from 'utils/helpers'
import { PrintManagerProviderData } from '../components'

function Providers() {
  const tokenAddress = '0x8983ec4b57dbebe8944af8d4f9d3adbafea5b9f1' as `0x${string}`
  if (isServerSide()) return null
  return (
    <section className="max-w-[1240px] m-auto px-4 gap-8 flex flex-col">
      <Seo title="providers" />
      <div className="p-4 text-black bg-slate-300 rounded-2xl">
        <ManagerProvider tokenAddress={tokenAddress}>
          <PrintManagerProviderData />
        </ManagerProvider>
      </div>
    </section>
  )
}

export default Providers

{
  /* <GovernorProvider proposalId="0xD0FDF3CD81E18DBC88C0F858E4EA00C48E3530A684C52839A4CE24302EDE91C3"> */
}
