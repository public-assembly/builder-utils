# Builder Utils

### Installation

Begin by installing the builder utils package into your React application.

```
pnpm add @public-assembly/builder-utils
```

```
npm i @public-assembly/builder-utils
```

```
yarn add @public-assembly/builder-utils
```

You'll also need to include the following dependencies at their specified versions.

```
 "peerDependencies": {
    "date-fns": "^2.29.3",
    "graphql": "^16.6.0",
    "graphql-request": "^5.0.0",
    "graphql-tag": "^2.12.6",
    "swr": "^1.3.0",
  },
```

### Configuring & Using Providers

Builder utils provides a collection of provider components used to dynamically pass contract specific data throughout your application. Begin configuring these provider components by wrapping your component tree with the `ManagerProvider` component and supplying your DAO's token address. This wrapper should live in the same place your providing your `WagmiConfig`.

```jsx
import { WagmiConfig } from 'wagmi'
import { ManagerProvider } from '@public-assembly/builder-utils'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <ManagerProvider tokenAddress="0xd2e7684cf3e2511cc3b4538bb2885dc206583076">
        {children}
      </ManagerProvider>
    </WagmiConfig>
  )
}
```

By providing just the token address, the `ManagerProvider` can retrieve the rest of the smart contract addresses associated with your DAO.

Once you've set up the `ManagerProvider` component, you can freely nest the other provider components within it and easily access the data they provide using their corresponding hooks.

```jsx
import { WagmiConfig } from 'wagmi'
import { ManagerProvider, GovernorProvider } from '@public-assembly/builder-utils'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <ManagerProvider tokenAddress="0xd2e7684cf3e2511cc3b4538bb2885dc206583076">
        <GovernorProvider>{children}</GovernorProvider>
      </ManagerProvider>
    </WagmiConfig>
  )
}
```

```jsx
import { useGovernorContext } from '@public-assembly/builder-utils'

function Proposals() {
  const { proposals, governorAddress } = useGovernorContext()

  return (
    <>
      <>Governor address: {governorAddress}</>
      <>Proposals array: {proposals}</>
    </>
  )
}
```
