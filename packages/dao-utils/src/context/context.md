# Auction Provider

The `AuctionProvider` component allows you to access the current state of an auction. That state refers specifically to the current `tokenId`, `highestBid`, `highestBidder`, `startTime`, `endTime`, and a boolean returning whether the auction has been `settled` or not.

If the root of your app has already been wrapped in both a `ManagerProvider` and `AuctionProvider` component, you can access an auction's current state from within any component or hook.

```jsx
import React from 'react';
import { useAuctionContext } from '@public-assembly/dao-utils'

function CurrentAuctionState() {
  const { tokenId, highestBidder } = useAuctionContext()

  return (
    <>
      <p>Current Token Id: {tokenId.toString()}</p>
      <p>Highest Bidder: {highestBidder}</p>
    </>
  )
}
```
