import { Seo } from '@/components/Seo'
import {
  ManagerProvider,
  useManagerProvider,
  GovernorProvider,
  useGovernorProvider,
} from '@public-assembly/dao-utils'
import { RawDisplayer } from '../components'

function PrintManagerProviderData() {
  const { daoAddresses } = useManagerProvider()
  return <RawDisplayer data={daoAddresses} />
}

function PrintGovernorProviderData() {
  const { proposalId, proposalDetails } = useGovernorProvider()
  return (
    <>
      <RawDisplayer data={proposalId} />
      <RawDisplayer data={proposalDetails} />
    </>
  )
}

function PrintAllProposals() {
  const { proposalArray } = useGovernorProvider()
  return <RawDisplayer data={proposalArray} />
}

function Providers() {
  return (
    <section className="max-w-[1240px] m-auto px-4 gap-8 flex flex-col">
      <Seo title="providers" />
      <div className="bg-slate-300 p-4 rounded-2xl text-black">
        <ManagerProvider tokenAddress="0xdf9b7d26c8fc806b1ae6273684556761ff02d422">
          <PrintManagerProviderData />
          <GovernorProvider proposalId="0xD0FDF3CD81E18DBC88C0F858E4EA00C48E3530A684C52839A4CE24302EDE91C3">
            <PrintGovernorProviderData />
            <PrintAllProposals />
          </GovernorProvider>
        </ManagerProvider>
      </div>
    </section>
  )
}

export default Providers
