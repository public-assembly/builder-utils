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
  const { proposalId, proposalDetails, proposalArray } = useGovernorProvider()
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
        <ManagerProvider tokenAddress="0x8983eC4B57dbebe8944Af8d4F9D3adBAfEA5b9f1">
          <PrintManagerProviderData />
          <GovernorProvider proposalId="0x892CC8EE0DDE04122318FED5C70FEA674BDFC46675142E9593FC3F338EDE6605">
            <PrintGovernorProviderData />
            <PrintAllProposals />
          </GovernorProvider>
        </ManagerProvider>
      </div>
    </section>
  )
}

export default Providers
