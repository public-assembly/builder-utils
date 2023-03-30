![dao-utils](https://hkzmq6akhweeabrxhijjq2oxlyzwgrhv5j6anakmfd5hxn4tunca.arweave.net/OrLIeAo9iEAGNzoSmGnXXjNjRPXqfAaBTCj6e7eTo0Q)

## dao-utils

React componentry and hooks to interact with the [ourzora/nouns-protocol](https://github.com/ourzora/nouns-protocol) smart contracts. If you're interested in contributing, please [open an issue](https://github.com/public-assembly/dao-utils/issues/new), create a pull request, or bring questions to the Public Assembly [forum](https://forum.public---assembly.com/).

### Documentation

For documentation check out the [sample app](https://dao-utils-next.vercel.app/) or visit [GitHub](https://github.com/public-assembly/dao-utils).

### Installation:

`npm i @public-assembly/dao-utils`

`pnpm add @public-assembly/dao-utils`

`yarn add @public-assembly/dao-utils`

#### Community

Create what's missing.

- Check out our other projects on [GitHub](https://github.com/orgs/public-assembly/repositories).
- Follow Public Assembly on [Twitter](https://twitter.com/pblcasmbly).
- Jump into the discussion on [Discourse](https://forum.public---assembly.com/).

---

### Peer Dependencies:

```
"date-fns": "^2.29.3",
"ethers": "^5.7.1",
"graphql": "^16.6.0",
"graphql-request": "^5.0.0",
"graphql-tag": "^2.12.6",
"react": "^18.2.0",
"react-dom": "^18.2.0",
"swr": "^1.3.0",
"wagmi": "0.9.x"
```

### Available Exports:

```
export {
  /**
   * Authentication Components
   */
  AuthCheck,
  /**
   * Auction Components
   */
  AuctionCountdown,
  CircleArrow,
  CurrentAuction,
  TokenExplorer,
  TokenHolder,
  TokenRenderer,
  TokenThumbnail,
  TokenTitle,
  TokenWinningBid,
  /**
   * Proposal Components
   */
  ProposalCard,
  ProposalCardGrid,
  ProposalDescription,
  ProposalPage,
  ProposalPageGrid,
  ProposalStatus,
  ProposalTimestamp,
  ProposalTitle,
  ProposalVoting,
  Proposer,
  /**
   * Hooks
   */
  useActiveAuction,
  useBidder,
  useCountdown,
  useDaoAuctionQuery,
  useDaoCollectionQuery,
  useDaoProposalQuery,
  useDaoToken,
  useInterval,
  useVote,
  /**
   * Utility Functions
   */
  etherscanLink,
  shortenAddress,
  zoraApiFetcher,
  /**
   * Providers & Context
   */
  useAuctionContext,
  AuctionProvider,
  useGovernorContext,
  GovernorProvider,
  useManagerContext,
  ManagerProvider,
  useMetadataContext,
  MetadataProvider,
  useTokenContext,
  TokenProvider,
  /**
   * Abis
   */
  auctionAbi,
  governorAbi,
  managerAbi,
  metadataAbi,
  tokenAbi,
}
```
