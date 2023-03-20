# @public-assembly/dao-utils

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
