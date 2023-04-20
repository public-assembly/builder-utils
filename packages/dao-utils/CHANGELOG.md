# @public-assembly/dao-utils

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

- Updates logic in the TokenExplorer component to utilize a DAO’s nftCount versus totalSupply. This was causing issues with DAOs where some tokens were not bidded on, and thus burned.

## 0.0.8

### Patch Changes

- Adds a TokenProvider and MetadataProvider to access DAO specific data across your app.

## 0.0.7

### Patch Changes

- Patches a pnpm bug and ensures wagmi dependencies are in order

## 0.0.6

### Patch Changes

- Adds a console log to the manager provider component in an attempt to trace a wagmi bug.
