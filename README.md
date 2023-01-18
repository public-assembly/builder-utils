![Public Assembly - Dao Utils](https://hkzmq6akhweeabrxhijjq2oxlyzwgrhv5j6anakmfd5hxn4tunca.arweave.net/OrLIeAo9iEAGNzoSmGnXXjNjRPXqfAaBTCj6e7eTo0Q)

# Public Assembly - ⌐◨-◨ Dao Utils

## [Github Repo](https://github.com/public-assembly/dao-utils)

🚨🚨🚨 ⌐◨-◨ PRE ALPHA ⌐◨-◨ 🚨🚨🚨

React componentry and hooks to interact with the [ourzora/nouns-protocol](https://github.com/ourzora/nouns-protocol) smart contracts.

Currently you can include a simple auction widget in your react / nextjs projects with underlying hooks. Many more features and far better architecture forthcoming! Designed to be included in a larger ethereum DAPP this library has numerous peer dependencies (optimizations coming).

Also included in this repo an example app exposing usage you can view at:
[https://dao-utils.public---assembly.com/examples](https://dao-utils.public---assembly.com/examples)

---

# 🦾 IT'S AS EASY AS 🤡:

```
import React from 'react'
import { TokenExplorer } from '@public-assembly/dao-utils'

export default function ReactThingAmaBob() {
  return <TokenExplorer daoAddress='0xdf9b7d26c8fc806b1ae6273684556761ff02d422' />
}
```
  
---

### Installation:
`npm i @public-assembly/dao-utils` 
   
`pnpm add @public-assembly/dao-utils` 
   
`yarn add @public-assembly/dao-utils` 

### Adding Peer Dependencies:
From the root directory, navigate to the package

`cd packages/dao-utils`

Add the package as a peer dependency

`npm i <package-name> --save-peer`

`pnpm add <package-name> --save-peer`

`yarn add <package-name> --save-peer`
   
---

### Peer Dependencies:
```
"@ethersproject/units": "^5.7.0",
"@rainbow-me/rainbowkit": "^0.6.0",
"@zoralabs/nouns-protocol": "^1.0.1",
"@zoralabs/zdk": "^2.1.8",
"bignumber.js": "^9.1.1",
"date-fns": "^2.29.3",
"ethers": "^5.7.1",
"graphql": "^16.6.0",
"graphql-request": "^5.0.0",
"graphql-tag": "^2.12.6",
"react": "^18.2.0",
"react-dom": "^18.2.0",
"swr": "^1.3.0",
"wagmi": "^0.6.6"
```

### Available Exports:

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
