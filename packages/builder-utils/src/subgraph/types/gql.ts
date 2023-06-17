/* eslint-disable */
import * as types from './graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  query AuctionConfig($id: ID!) {\n    dao(id: $id) {\n      id\n      auctionConfig {\n        minimumBidIncrement\n        reservePrice\n        timeBuffer\n        duration\n      }\n    }\n  }\n':
    types.AuctionConfigDocument,
  '\n  query CurrentAuction($id: ID!) {\n    dao(id: $id) {\n      id\n      currentAuction {\n        startTime\n        endTime\n        extended\n        winningBid {\n          amount\n          bidder\n        }\n        settled\n        tokenId\n        highestBid {\n          amount\n          bidder\n        }\n      }\n    }\n  }\n':
    types.CurrentAuctionDocument,
  '\n  query DaoAddresses($id: ID!) {\n    dao(id: $id) {\n      id\n      treasuryAddress\n      auctionAddress\n      governorAddress\n      metadataAddress\n    }\n  }\n':
    types.DaoAddressesDocument,
  '\n  query HistoricalAuction($id: ID!, $tokenId: BigInt) {\n    dao(id: $id) {\n      id\n      auctions(where: { tokenId: $tokenId }) {\n        startTime\n        endTime\n        extended\n        winningBid {\n          amount\n          bidder\n        }\n        settled\n        tokenId\n        highestBid {\n          bidder\n          amount\n        }\n        bids {\n          bidder\n          amount\n        }\n      }\n    }\n  }\n':
    types.HistoricalAuctionDocument,
  '\n  query HistoricalToken($id: ID!, $tokenId: BigInt!) {\n    dao(id: $id) {\n      id\n      tokens(where: { tokenId: $tokenId }) {\n        tokenId\n        name\n        owner\n        mintedAt\n        image\n      }\n    }\n  }\n':
    types.HistoricalTokenDocument,
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query AuctionConfig($id: ID!) {\n    dao(id: $id) {\n      id\n      auctionConfig {\n        minimumBidIncrement\n        reservePrice\n        timeBuffer\n        duration\n      }\n    }\n  }\n'
): typeof documents['\n  query AuctionConfig($id: ID!) {\n    dao(id: $id) {\n      id\n      auctionConfig {\n        minimumBidIncrement\n        reservePrice\n        timeBuffer\n        duration\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query CurrentAuction($id: ID!) {\n    dao(id: $id) {\n      id\n      currentAuction {\n        startTime\n        endTime\n        extended\n        winningBid {\n          amount\n          bidder\n        }\n        settled\n        tokenId\n        highestBid {\n          amount\n          bidder\n        }\n      }\n    }\n  }\n'
): typeof documents['\n  query CurrentAuction($id: ID!) {\n    dao(id: $id) {\n      id\n      currentAuction {\n        startTime\n        endTime\n        extended\n        winningBid {\n          amount\n          bidder\n        }\n        settled\n        tokenId\n        highestBid {\n          amount\n          bidder\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query DaoAddresses($id: ID!) {\n    dao(id: $id) {\n      id\n      treasuryAddress\n      auctionAddress\n      governorAddress\n      metadataAddress\n    }\n  }\n'
): typeof documents['\n  query DaoAddresses($id: ID!) {\n    dao(id: $id) {\n      id\n      treasuryAddress\n      auctionAddress\n      governorAddress\n      metadataAddress\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query HistoricalAuction($id: ID!, $tokenId: BigInt) {\n    dao(id: $id) {\n      id\n      auctions(where: { tokenId: $tokenId }) {\n        startTime\n        endTime\n        extended\n        winningBid {\n          amount\n          bidder\n        }\n        settled\n        tokenId\n        highestBid {\n          bidder\n          amount\n        }\n        bids {\n          bidder\n          amount\n        }\n      }\n    }\n  }\n'
): typeof documents['\n  query HistoricalAuction($id: ID!, $tokenId: BigInt) {\n    dao(id: $id) {\n      id\n      auctions(where: { tokenId: $tokenId }) {\n        startTime\n        endTime\n        extended\n        winningBid {\n          amount\n          bidder\n        }\n        settled\n        tokenId\n        highestBid {\n          bidder\n          amount\n        }\n        bids {\n          bidder\n          amount\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query HistoricalToken($id: ID!, $tokenId: BigInt!) {\n    dao(id: $id) {\n      id\n      tokens(where: { tokenId: $tokenId }) {\n        tokenId\n        name\n        owner\n        mintedAt\n        image\n      }\n    }\n  }\n'
): typeof documents['\n  query HistoricalToken($id: ID!, $tokenId: BigInt!) {\n    dao(id: $id) {\n      id\n      tokens(where: { tokenId: $tokenId }) {\n        tokenId\n        name\n        owner\n        mintedAt\n        image\n      }\n    }\n  }\n']

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
