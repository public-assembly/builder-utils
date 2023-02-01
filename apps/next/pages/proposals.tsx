import { Seo } from '@/components/Seo'
import {
  ManagerProvider,
  GovernorProvider,
  ProposalCardGrid,
} from '@public-assembly/dao-utils'
import { isServerSide } from 'utils/helpers'

function Proposals() {
  const tokenAddress = '0xd2e7684cf3e2511cc3b4538bb2885dc206583076' as `0x${string}`
  if (isServerSide()) return null
  return (
    <section className="mx-auto px-4 gap-8 flex flex-col justify-center">
      <Seo title="proposals" />
      <div>
        <ManagerProvider tokenAddress={tokenAddress}>
          <GovernorProvider proposalId="0x39198d469ff9ca1dbe1c32dc48b93a6d82c86ed8038723a43043f9066ed52bca">
            <ProposalCardGrid />
          </GovernorProvider>
        </ManagerProvider>
      </div>
    </section>
  )
}

export default Proposals
