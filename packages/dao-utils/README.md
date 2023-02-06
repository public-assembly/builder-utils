![Public Assembly - DAO utils](https://hkzmq6akhweeabrxhijjq2oxlyzwgrhv5j6anakmfd5hxn4tunca.arweave.net/OrLIeAo9iEAGNzoSmGnXXjNjRPXqfAaBTCj6e7eTo0Q)

# DAO utils by Public Assembly

## [GitHub Repo](https://github.com/public-assembly/dao-utils)

🚨 PRE ALPHA 🚨

React componentry and hooks to interact with the [ourzora/nouns-protocol](https://github.com/ourzora/nouns-protocol) smart contracts.

[View examples](https://dao-utils.public---assembly.com/examples)

If you're interested in contributing, please open an issue, create a pull request, or bring questions to the Public Assembly forum.

---

### Installation:
`npm i @public-assembly/dao-utils` 
   
`pnpm add @public-assembly/dao-utils` 
   
`yarn add @public-assembly/dao-utils` 
   

---

### Peer Dependencies:
```
"@ethersproject/units": "^5.7.0",
"@rainbow-me/rainbowkit": "^0.8.1",
"bignumber.js": "^9.1.1",
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
   * Auction Components
   */
  CurrentAuction,
  TokenExplorer,
  AuthCheck,
  /**
   * Proposal Components
   */
  ProposalCardGrid,
  ProposalPageGrid,
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
  /**
   * Providers & Context
   */
  useAuctionContext,
  AuctionProvider,
  useGovernorContext,
  GovernorProvider,
  useManagerContext,
  ManagerProvider,
}
```