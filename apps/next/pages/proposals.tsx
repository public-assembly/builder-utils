import { Seo } from '../components/Seo'
import {
  ManagerProvider,
  GovernorProvider,
  ProposalCardGrid,
  ProposalPageGrid,
} from '@public-assembly/dao-utils'
import { isServerSide } from '../utils/helpers'

function Proposals() {
  const tokenAddress = '0xd2e7684cf3e2511cc3b4538bb2885dc206583076' as `0x${string}`
  if (isServerSide()) return null
  return (
    <section className="max-w-[1240px] m-auto px-4 gap-8 flex flex-col">
      <Seo title="proposals" />
      <div>
        <ManagerProvider tokenAddress={tokenAddress}>
          <GovernorProvider>
            {/* <ProposalCardGrid /> */}
            <ProposalPageGrid />
          </GovernorProvider>
        </ManagerProvider>
      </div>
    </section>
  )
}

export default Proposals
