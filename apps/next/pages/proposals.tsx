import { Seo } from '@/components/Seo'
import {
  ManagerProvider,
  GovernorProvider,
  ProposalPageGrid,
} from '@public-assembly/dao-utils'
import { isServerSide } from 'utils/helpers'

function Proposals() {
  const tokenAddress = process.env.NEXT_PUBLIC_TOKEN_ADDRESS as `0x${string}`

  if (isServerSide()) return null
  return (
    <section className="max-w-[1240px] m-auto px-4 gap-8 flex flex-col">
      <Seo title="proposals" />
      <div>
        <ManagerProvider tokenAddress={tokenAddress}>
          <GovernorProvider>
            <ProposalPageGrid />
          </GovernorProvider>
        </ManagerProvider>
      </div>
    </section>
  )
}

export default Proposals
