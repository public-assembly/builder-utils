import { Seo } from '@/components/Seo'
import { TokenThumbnail, TokenTitle, TokenWinningBid } from '@public-assembly/dao-utils'
import { isServerSide } from 'utils/helpers'

function Componentry() {
  const tokenAddress = '0xdf9b7d26c8fc806b1ae6273684556761ff02d422' as `0x${string}`
  if (isServerSide()) return null

  return (
    <section className="max-w-[1240px] m-auto px-4 gap-8 flex flex-col">
      <Seo title="componentry" />
      <div className="max-w-[930px] mx-auto -z-10">
        <div className="flex justify-center gap-x-8">
          <span className="sm-font text-white">Token Thumbnail</span>
          <div className="bg-slate-300 p-4 rounded-2xl">
            <TokenThumbnail tokenAddress={tokenAddress} tokenId="1" />
          </div>
        </div>
        <div className="flex justify-center gap-x-8">
          <span className="sm-font text-white">Token Title</span>
          <div className="bg-slate-300 p-4 rounded-2xl">
            <TokenTitle tokenAddress={tokenAddress} tokenId="1" />
          </div>
        </div>
        <div className="flex justify-center gap-x-8">
          <span className="sm-font text-white">Token Winning Bid</span>
          <div className="bg-slate-300 p-4 rounded-2xl">
            <TokenWinningBid tokenAddress={tokenAddress} tokenId="1" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Componentry
