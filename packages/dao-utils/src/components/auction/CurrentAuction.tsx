import * as React from 'react'
import AuctionCountdown from './AuctionCountdown'
import TokenThumbnail from './TokenThumbnail'
import TokenTitle from './TokenTitle'
import { useActiveAuction, useDaoCollectionQuery, useBidder } from '../../hooks'
import { HexString } from '../../types'
import { ethers } from 'ethers'

export interface CurrentAuctionProps extends React.HTMLProps<HTMLDivElement> {
  tokenAddress: HexString
  tokenId: string
}

export default function CurrentAuction({
  tokenAddress,
  tokenId,
  ...props
}: CurrentAuctionProps) {
  const {
    createBid,
    updateBidAmount,
    createBidSuccess,
    createBidLoading,
    isValidBid,
    auctionState,
    minBidAmount,
  } = useActiveAuction(tokenAddress)

  const bidder = useBidder(auctionState.highestBidder)

  const { nftCount } = useDaoCollectionQuery({ tokenAddress: tokenAddress })

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    createBid?.()
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-[1440px]" {...props}>
      <TokenThumbnail tokenId={tokenId} tokenAddress={tokenAddress} />

      <div className="flex flex-col justify-end gap-4">
        {nftCount && (
          <TokenTitle tokenAddress={tokenAddress} tokenId={(nftCount - 1).toString()} />
        )}
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-10">
            <div className="flex flex-col">
              <span>Current Bid:</span>
              <span>{ethers.utils.formatEther(auctionState.highestBid)} ETH</span>
            </div>

            <AuctionCountdown endTime={Number(auctionState.endTime)} />
          </div>
          <span>Bidder: {bidder.bidder}</span>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-row gap-4">
            <input
              className="form-input px-[10px] py-[5px]"
              type="text"
              pattern="[0-9.]*"
              placeholder={`${minBidAmount} ETH`}
              disabled={createBidLoading}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                updateBidAmount(event.target.value)
              }
            />
            {!createBidLoading && !createBidSuccess ? (
              <button
                className={`underline ${
                  !isValidBid && 'pointer-events-none opacity-20'
                }`}>
                Place Bid
              </button>
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
      </div>
    </div>
  )
}
