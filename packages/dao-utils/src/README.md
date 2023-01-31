# Overview

Included in this package are a set of React hooks and frontend components designed to allow anyone to spin up a website for their Nounish DAO. The hooks retrieve information from the Zora Nouns Protocol and pass it to an array of components that enable interactions with a DAO's auctions and proposals. Also included are a group of context providers that allow contract specific data to be easily retrieved and supplied anywhere throughout your app.

## Hooks

| Hook | Usage |
| -- | -- |
| [useActiveAuction]| Provides data and functions for users to bid on an NFT in an active auction.
| [useBidder]| Returns a bidder's ENS name or shortened address, using wagmi's `useEnsName`hook and a `shortenAddress` function.
| [useCountdown]| Returns a countdown string updated every second for a given end time in unix timestamp format.
| [useDaoToken]| Returns offchain metadata for a given token address and token ID.
| [useDaoAuctionQuery]| Returns query data for an active auction given a DAO's token address.
| [useNounsProtocol]| Fetches data from the Zora Nouns Protocol to create instances of the Auction, Token, and MetadataRenderer contracts, allowing interaction with the returned objects.

## Components 
| Component | Usage |
| -- | -- |
| [AuthCheck]| Uses the `useAccount` hook from wagmi to determine the connection status of an account and displays either the `Connect` component or an element passed in as the `formUI` property, depending on the connection status.
| [CurrentAuction]| Displays information about a token auction, such as the current highest bid, remaining time, and highest bidder, and enables users to place a bid if authenticated by connecting to the Zora Nouns Protocol.
| [TokenRenderer] | Displays a two-column div element that shows NFT DAO Art and settled auction information, including the title of the DAO NFT, token ID, current holder information, etc.
| [TokenExplorer]| Displays either the `CurrentAuction` or `TokenRenderer` component based on the state of `tokenId` and provides pagination of DAO NFTs, enabling users to flip back and forth between NFTs.
