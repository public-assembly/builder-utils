# Overview

These react hooks and frontend components work together to provide an efficient way for non-technical or low-code users to quickly spin up flexibly customizable DAO websites. The hooks retrieve information from Zora Nouns Protocol and transform it into auctions, tokens, and metadata objects, while the components showcase and enable interaction with the auctions.

## Hooks

| Hook | Usage |
| -- | -- |
| [useActiveAuction]| Provides data and functions for users to bid on an NFT in an active auction.
| [useBidder]| Returns a bidder's ENS name or shortened address, using wagmi's "useEnsName" and a "shortenAddress" function.
| [useCountdown]| Returns a countdown string updated every second for a given end time in Unix timestamp format.
| [useDaoToken]| Returns off-chain metadata for a given token address and token ID.
| [useDaoAuctionQuery]| Returns query data for an active auction of a given DAO token address.
| [useNounsProtocol]| Fetches data from the Zora Nouns Protocol to create instances of the Auction, Token, and MetadataRenderer contracts and sets them, allowing interaction with the returned objects.

## Components 
| Component | Usage |
| -- | -- |
| [AuthCheck]| Uses the "useAccount" hook from the wagmi library to determine the connection status of an account and displays either the "Connect" component or an element passed in as the "formUI" prop, depending on the connection status.
| [CurrentAuction]| Displays information about a token auction, such as the current highest bid, remaining time, and highest bidder, and enables users to place a bid if authenticated by connecting to the Zora Nouns protocol.
| [TokenRenderer] | Displays a two-column div element that shows DAO Art and settled auction information, including the title of the DAO NFT, token ID, current holder information, etc.
| [TokenExplorer]| Displays either the "CurrentAuction" or "TokenRenderer" component based on the state of "tokenId" and provides pagination of DAO NFTs, enabling users to flip back and forth between NFTs.
