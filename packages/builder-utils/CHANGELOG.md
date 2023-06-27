# @public-assembly/builder-utils

## 0.1.10

### Patch Changes

- f716ef4: Adds sort order to bid queries. Adds bid query directly to current auction query.

## 0.1.9

### Patch Changes

- 314f271: Previously certain return statements were breaking the rules of hooks. Fixes ENS resolution approach.

## 0.1.8

### Patch Changes

- 010a37b: Adds a daoDetails query and associated hook to return general information about a DAO.

## 0.1.7

### Patch Changes

- 0ebdd53: Ensures that isFirstToken and isLastToken are defined regardless if values are numbers or strings.

## 0.1.6

### Patch Changes

- 455eb48: Adds the useVote hook for voting interactions.

## 0.1.5

### Patch Changes

- fded1c8: Reintroduces the GovernorProvider component and associated hook to handle proposal data.

## 0.1.4

### Patch Changes

- be68c9b: Moves package away from the existing ZORA API dependency. Utilizes Nouns Builder subgraph.

## 0.1.3

### Patch Changes

- 447cce2: Removes the set state return function from useMinBidAmount. Adds the duration function to the multicall inside useAuctionSettings.

## 0.1.2

### Patch Changes

- f0f15c3: Reintroduces wagmi and alongside it, two write hooks, useCreateBid and useSettle. useTokenExplorer now expects a token id object as an argument.

## 0.1.1

### Patch Changes

- 8bd4a66: useMinBidAmount no longer accepts a token address as an argument. useTokenExplorer now has a useEffect hook to ensure the initial state of currentTokenId is correct.

## 0.1.0

### Minor Changes

- 10867f0: This minor bump introduces breaking changes. All componentry has been stripped from the package. The wagmi dependency has been removed, and ethers alongisde it which has been replaced by viem. There are currently no write calls exported by the package. Types have been reorganized into the files that use them.

## 0.0.33

### Patch Changes

- Dao utils is now builder utils. And wagmi now uses viem over ethers.

## 0.0.31

### Patch Changes

- Adds two new hooks, useTokenExplorer and useTokenMetadata. Refactors the CurrentAuction component to prevent a refresh when placing a bid.

## 0.0.30

### Patch Changes

- Fixes a bug where a value from useAuctionContext was being returned that no longer exists in the hook.

## 0.0.29

### Patch Changes

- Fixes a bug where certain provider components would return empty values.

## 0.0.28

### Patch Changes

- Updates the logic inside the TokenExplorer component. Refactors the AuctionProvider component to return current auction state data.

## 0.0.27

### Patch Changes

- Updates useActiveAuction hook to use wagmi hooks.

## 0.0.26

### Patch Changes

- Attemps to solve build issues in the previous version.

## 0.0.25

### Patch Changes

- Adjusts the dependency array inside the useBid hook. Fixes an error where RPC calls were getting spammed.

## 0.0.24

### Patch Changes

- Exposes the useBid hook.

## 0.0.23

### Patch Changes

- Fixes errors in previous version where components were not being exported properly.

## 0.0.22

### Patch Changes

- Refactors the TokenWinningBid component to use the newly added useBid hook.

## 0.0.21

### Patch Changes

- Fixes errors in previous version where certain contract addresses were hardcoded.

## 0.0.20

### Patch Changes

- Removes the useNounsProtocol hook. Adds provider logic from builder for useContract instances. Updates both READMEs.

## 0.0.19

### Patch Changes

- Adds pagination field to the proposal query so that it returns the maximum number of responses.

## 0.0.18

### Patch Changes

- Adds transaction hash field to the gql proposal query.

## 0.0.17

### Patch Changes

- Thanks @vanceingalls! Adds types across the package.

## 0.0.16

### Patch Changes

- This patch bump introduces breaking changes. It is now necessary to define the CHAIN_ID of your application as an environment variable. Adds support for Goerli testnet.Adds support for supplying a ZORA API key.

## 0.0.15

### Patch Changes

- Removes types field from package.json, which allows types to be interpreted automatically.

## 0.0.14

### Patch Changes

- Removes types field from package.json, which allows types to be interpreted automatically.

## 0.0.13

### Patch Changes

- The hook useVote now takes a proposal object as a prop. Also removes a console log from the ManagerProvider.

## 0.0.12

### Patch Changes

- Exposes all the included hooks as of 0.0.11.

## 0.0.11

### Patch Changes

- Exposes each contract's ABI to allow other frontends to call functions that aren't supported in this package.

## 0.0.10

### Patch Changes

- Updates the TokenTitle instance inside the CurrentAuction component to use nftCount over totalSupply.

## 0.0.9

### Patch Changes

- Updates logic in the TokenExplorer component to utilize a builder’s nftCount versus totalSupply. This was causing issues with builders where some tokens were not bidded on, and thus burned.

## 0.0.8

### Patch Changes

- Adds a TokenProvider and MetadataProvider to access builder specific data across your app.

## 0.0.7

### Patch Changes

- Patches a pnpm bug and ensures wagmi dependencies are in order

## 0.0.6

### Patch Changes

- Adds a console log to the manager provider component in an attempt to trace a wagmi bug.
