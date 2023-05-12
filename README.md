# **builder-utils**

React componentry and hooks to interact with the [ourzora/nouns-protocol](https://github.com/ourzora/nouns-protocol) smart contracts.

---

## **Getting Started**

Begin by installing the [builder-utils](https://www.npmjs.com/package/@public-assembly/builder-utils?activeTab=versions) package into your React application.

`npm i @public-assembly/builder-utils`

`pnpm add @public-assembly/builder-utils`

`yarn add @public-assembly/builder-utils`

You'll also need to include the following dependencies at their specified versions.


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
---

### **Configuring & Using Providers**

Your Nounish builder consists of multiple smart contracts, with each contract handling unique functionality and capable of returning contract specific data.

This package contains hooks that enable you to retrieve that contract specific data from any part of your application. It utilizes React context and aggregates on and offchain chain data into contract specific providers.

To begin utilizing these providers, wrap your app with the `ManagerProvider` component. However, because this component utilizes wagmi hooks, you'll need to ensure this component is being loaded client side. Below is a solution to this using [next/dynamic](https://nextjs.org/docs/advanced-features/dynamic-import) from Next.js.

```jsx
import dynamic from 'next/dynamic'

const DynamicManagerProvider = dynamic(
  () => import('@public-assembly/builder-utils').then((module) => module.ManagerProvider),
  {
    ssr: false,
  }
)

function App() {
  return (
    <DynamicManagerProvider tokenAddress={tokenAddress}>
      <YourRoutes />
    </DynamicManagerProvider>
  )
}
```

If you're not in a Next.js environment, you can handle this issue using something like `useIsClient()` from [usehooks-ts](https://usehooks-ts.com/react-hook/use-is-client).

```jsx
import { useIsClient } from 'usehooks-ts'

function App() {
  const isClient = useIsClient()

  if (!isClient) return null
  return (
    <ManagerProvider tokenAddress={tokenAddress}>
      <YourRoutes />
    </ManagerProvider>
  )
}
```

By providing just the token address of your builder, the `ManagerProvider` can retrieve the rest of the smart contract addresses associated with your builder. Your builder's token address is the address of your builder's Token.sol contract, and is referred to as NFT under the smart contracts tab on [Nouns Builder](https://nouns.build/).

Once you've set up the `ManagerProvider` component, you can freely nest the other provider components within it and easily access the data they provide using their corresponding hooks.

```jsx
import { useIsClient } from 'usehooks-ts'

function App() {
  const isClient = useIsClient()

  if (!isClient) return null
  return (
    <ManagerProvider tokenAddress={tokenAddress}>
      <GovernorProvider>
        <YourRoutes />
      </GovernorProvider>
    </ManagerProvider>
  )
}
```

```jsx
import { useGovernorContext } from '@public-assembly/builder-utils'

function Proposals() {
  const { proposals, governorAddress } = useGovernorContext()

  return <></>
}
```

---

### **Componentry**

In addition to the providers described above, there is a number of prebuilt components that will allow you to get up and running quickly. For instance, the `TokenExplorer` component is what is used on the auction page of this sample app. However, if you want to make unique decisions surrounding copy and styling, you'll have to take a [closer look](https://github.com/public-assembly/builder-utils/blob/main/packages/builder-utils/src/components/TokenExplorer.tsx) at the ways these components are put together.

```jsx
import { TokenExplorer } from '@public-assembly/builder-utils'

function AuctionExplorer() {
  return <TokenExplorer tokenAddress='0xdf9b7d26c8fc806b1ae6273684556761ff02d422' />
}
```

Beneath this getting started guide is a full list of all the hooks and componentry exposed via the package. If you're interested in contributing, please [open an issue](https://github.com/public-assembly/builder-utils/issues/new), create a pull request, or bring questions to the Public Assembly [forum](https://forum.public---assembly.com/).

---

### **Community**

Create what's missing.

- Check out our other projects on [GitHub](https://github.com/orgs/public-assembly/repositories).
- Follow Public Assembly on [Twitter](https://twitter.com/pblcasmbly).
- Jump into the discussion on [Discourse](https://forum.public---assembly.com/).

---

### **Available Exports**

```js
export {
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
  usebuilderAuctionQuery,
  usebuilderCollectionQuery,
  usebuilderProposalQuery,
  usebuilderTokenQuery,
  useInterval,
  useTokenExplorer,
  useTokenMetadata,
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
