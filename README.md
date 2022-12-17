![Public Assembly - Dao Utils](https://hkzmq6akhweeabrxhijjq2oxlyzwgrhv5j6anakmfd5hxn4tunca.arweave.net/OrLIeAo9iEAGNzoSmGnXXjNjRPXqfAaBTCj6e7eTo0Q)

# Public Assembly - ⌐◨-◨ Dao Utils

## [Github Repo](https://github.com/public-assembly/dao-utils)

🚨🚨🚨 ⌐◨-◨ PRE ALPHA ⌐◨-◨ 🚨🚨🚨

React componentry and hooks to interact with the [ourzora/nouns-protocol](https://github.com/ourzora/nouns-protocol) smart contracts.

Currently you can include a simple auction widget in your react / nextjs projects with underlying hooks. Many more features and far better architecture forthcoming! Designed to be included in a larger ethereum DAPP this library has numerous peer dependencies (optimizations coming).

Also included in this repo an example app exposing usage you can view at:
[https://dao-utils.public---assembly.com/examples](https://dao-utils.public---assembly.com/examples)

## Available Exports:

```
export {
  /**
   * Components
   */
  CurrentAuction,
  TokenExplorer,
  AuthCheck,
  /**
   * Hooks
   */
  useCountdown,
  useDaoAuctionQuery,
  useDaoToken,
  useBidder,
  useActiveAuction,
  useNounsProtocol,
  /**
   * Utility Functions
   */
  etherscanLink,
  shortenAddress,
  zoraApiFetcher,
}
```
