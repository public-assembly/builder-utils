import { Seo } from '@/components/Seo'
import { ManagerProvider, GovernorProvider } from '@public-assembly/dao-utils'
import { isServerSide } from 'utils/helpers'
import { PrintManagerProviderData } from '../components'

function Providers() {
  const tokenAddress = '0xdf9b7d26c8fc806b1ae6273684556761ff02d422' as `0x${string}`
  if (isServerSide()) return null
  return (
    <section className="max-w-[1240px] m-auto px-4 gap-8 flex flex-col">
      <Seo title="providers" />
      <div className="p-4 text-black bg-slate-300 rounded-2xl">
        <ManagerProvider tokenAddress={tokenAddress}>
          <GovernorProvider proposalId="0xdfd4d9a05131e7a4106589af59d5b16015eb0890aa86ea9a78ec329385747631">
            <PrintManagerProviderData />
          </GovernorProvider>
        </ManagerProvider>
      </div>
    </section>
  )
}

export default Providers
