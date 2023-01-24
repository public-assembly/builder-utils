/* @ts-ignore */
import * as React from 'react'
import AuctionCountdown from './AuctionCountdown'
import TokenThumbnail from './TokenThumbnail'
import TokenTitle from './TokenTitle'
import AuthCheck from './authentication/AuthCheck'
import { useActiveAuction } from '../hooks/useActiveAuction'

/**
 * TODO:
 * - render bid success txHash
 * - break ui out into atomic components
 */

export interface CurrentAuctionProps extends React.HTMLProps<HTMLDivElement> {
  /**
   * Nounish NFT Contract address
   */
  tokenAddress: string
}

export default function CurrentAuction({ tokenAddress, ...props }: CurrentAuctionProps) {
  const {
    auctionData,
    createBid,
    updateBidAmount,
    createBidSuccess,
    createBidLoading,
    isValidBid,
    totalSupply,
  } = useActiveAuction(tokenAddress)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-[1440px]" {...props}>
      {auctionData?.tokenId && (
        <TokenThumbnail tokenId={auctionData.tokenId} tokenAddress={tokenAddress} />
      )}
      <div className="flex flex-col justify-end gap-4">
        {totalSupply && (
          <TokenTitle
            tokenAddress={tokenAddress}
            tokenId={(totalSupply - 1).toString()}
          />
        )}
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-10">
            <div className="flex flex-col">
              <span>Current Bid:</span>
              <span>{auctionData?.highestBidPrice} ETH</span>
            </div>
            {auctionData?.endTime && (
              <AuctionCountdown endTime={Number(auctionData.endTime)} />
            )}
          </div>
          <span>Bidder: {auctionData?.highestBidder}</span>
        </div>
        <AuthCheck
          connectCopy={'Connect to bid'}
          formUI={
            <div>
              <form onSubmit={createBid} className="flex flex-row gap-4">
                <input
                  className="form-input px-[10px] py-[5px]"
                  type="text"
                  pattern="[0-9.]*"
                  placeholder={`${auctionData?.minBidAmount} ETH`}
                  onChange={(event: any) => updateBidAmount(event.target.value)}
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
          }
        />
      </div>
    </div>
  )
}
