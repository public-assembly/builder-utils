import { Seo } from '@/components/Seo'
// import { isServerSide } from 'utils/helpers'
import { TokenThumbnail } from '@public-assembly/dao-utils'
import { isServerSide } from 'utils/helpers'

function Componentry() {
  const tokenAddress = '0xdf9b7d26c8fc806b1ae6273684556761ff02d422' as `0x${string}`
  if (isServerSide()) return null

  return (
    <section className="max-w-[1240px] m-auto px-4 gap-8 flex flex-col">
      <Seo title="componentry" />
      <div className="max-w-[560px] mx-auto -z-10 bg-slate-300 p-4 rounded-2xl text-black">
        <TokenThumbnail tokenAddress={tokenAddress} tokenId="1" />
      </div>
    </section>
  )
}

export default Componentry
