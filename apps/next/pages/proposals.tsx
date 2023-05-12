import { Seo } from '@/components/Seo'
import { GovernorProvider, ProposalPageGrid } from '@public-assembly/builder-utils'

function Proposals() {
  return (
    <section className="max-w-[1240px] m-auto px-4 gap-8 flex flex-col">
      <Seo title="proposals" />
      <div>
        <GovernorProvider>
          <ProposalPageGrid />
        </GovernorProvider>
      </div>
    </section>
  )
}

export default Proposals
