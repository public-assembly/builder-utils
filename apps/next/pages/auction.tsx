import dynamic from 'next/dynamic'
import { Seo } from '@/components/Seo'
import { useBid } from '@public-assembly/dao-utils'

const AuctionModule = dynamic(() => import('../components/AuctionModule'), {
  ssr: false,
})

function Auction() {
  const tokenAddress = process.env.NEXT_PUBLIC_TOKEN_ADDRESS as `0x${string}`

  const { winningBid } = useBid({ tokenAddress: tokenAddress, tokenId: '1' })

  console.log(winningBid)

  return (
    <section className="max-w-[1240px] m-auto px-4 gap-8 flex flex-col">
      <Seo title="auction" />
      <div className="bg-slate-300 p-4 rounded-2xl text-black">
        <AuctionModule tokenAddress={tokenAddress} />
      </div>
    </section>
  )
}

export default Auction
