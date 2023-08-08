import { AuctionCountdown } from './AuctionCountdown'
import {
  useCreateBid,
  useAuctionState,
  useManagerContext,
  useMinBidAmount,
} from '@public-assembly/builder-utils'

export function Bidding() {
  const { auctionState } = useAuctionState()

  const { tokenAddress } = useManagerContext()

  const { minBidAmount, bidAmount, updateBidAmount, isValidBid } = useMinBidAmount()

  const { createBid, createBidLoading, createBidSuccess } = useCreateBid({
    bidAmount: bidAmount,
  })

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    createBid?.()
  }

  return (
    <>
      <>
        <div>
          <span>Current Bid:</span>
          <span>{auctionState?.highestBid} ETH</span>
        </div>
        <AuctionCountdown endTime={Number(auctionState?.endTime)} />
        <span>Bidder: {auctionState?.highestBidder}</span>
      </>

      <div>
        <form onSubmit={handleSubmit}>
          <input
            style={{ color: 'black' }}
            type="text"
            pattern="[0-9.]*"
            placeholder={`${minBidAmount} ETH`}
            disabled={createBidLoading}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              updateBidAmount(event.target.value)
            }
          />
          {!createBidLoading && !createBidSuccess ? (
            <button>Place Bid</button>
          ) : (
            <>
              {createBidLoading && <span>Submitting bid</span>}
              {createBidSuccess && (
                <a
                  href={`https://nouns.build/dao/${tokenAddress}`}
                  target="_blank"
                  rel="noreferrer">
                  Bid placed: view on nouns.build
                </a>
              )}
            </>
          )}
        </form>
      </div>
    </>
  )
}
