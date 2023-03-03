import dynamic from 'next/dynamic'
import { Seo } from '@/components/Seo'

const AuctionModule = dynamic(() => import('../components/AuctionModule'), {
  ssr: false,
})

const DAOS = [
  '0xdf9b7d26c8fc806b1ae6273684556761ff02d422',
  '0xc230ba378d2d63da003CD5598642D72c6ba42d1E',
  '0xd2E7684Cf3E2511cc3B4538bB2885Dc206583076',
  '0x96e396e66087b2b9dcad36fd473e1b049df18998',
  '0x8983ec4b57dbebe8944af8d4f9d3adbafea5b9f1',
  '0xa45662638e9f3bbb7a6fecb4b17853b7ba0f3a60',
] as `0x${string}`[]

function Examples() {
  return (
    <section className="max-w-[1240px] m-auto px-4 gap-8 flex flex-col">
      <Seo title="examples" />
      {DAOS.map((address) => (
        <div key={address} className="bg-slate-300 p-4 rounded-2xl text-black">
          <AuctionModule address={address} />
        </div>
      ))}
    </section>
  )
}

export default Examples
