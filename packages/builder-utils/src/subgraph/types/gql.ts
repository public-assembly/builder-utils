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
  '\n  query AuctionConfig($id: ID!) {\n    dao(id: $id) {\n      auctionConfig {\n        minimumBidIncrement\n        reservePrice\n        timeBuffer\n        duration\n      }\n    }\n  }\n':
    types.AuctionConfigDocument,
  '\n  query CurrentAuction($id: ID!) {\n    dao(id: $id) {\n      currentAuction {\n        token {\n          tokenId\n        }\n        startTime\n        endTime\n        extended\n        settled\n        winningBid {\n          amount\n          bidder\n        }\n        highestBid {\n          amount\n          bidder\n        }\n        token {\n          tokenId\n        }\n      }\n    }\n  }\n':
    types.CurrentAuctionDocument,
  '\n  query DaoAddresses($id: ID!) {\n    dao(id: $id) {\n      treasuryAddress\n      auctionAddress\n      governorAddress\n      metadataAddress\n    }\n  }\n':
    types.DaoAddressesDocument,
  '\n  query DaoDetails($id: ID!) {\n    dao(id: $id) {\n      name\n      symbol\n      description\n      contractImage\n      projectURI\n      ownerCount\n      totalSupply\n      totalAuctionSales\n      proposalCount\n    }\n  }\n':
    types.DaoDetailsDocument,
  '\n  query DaoProposals($id: ID!) {\n    dao(id: $id) {\n      proposals(orderDirection: desc, orderBy: timeCreated) {\n        id\n      }\n    }\n  }\n':
    types.DaoProposalsDocument,
  '\n  query HistoricalAuction($id: ID!, $tokenId: BigInt!) {\n    dao(id: $id) {\n      tokens(where: { tokenId: $tokenId }) {\n        tokenId\n        auction {\n          startTime\n          endTime\n          extended\n          winningBid {\n            amount\n            bidder\n          }\n          settled\n          highestBid {\n            bidder\n            amount\n          }\n          bids {\n            bidder\n            amount\n          }\n        }\n      }\n    }\n  }\n':
    types.HistoricalAuctionDocument,
  '\n  query HistoricalToken($id: ID!, $tokenId: BigInt!) {\n    dao(id: $id) {\n      tokens(where: { tokenId: $tokenId }) {\n        tokenId\n        name\n        owner\n        mintedAt\n        image\n      }\n    }\n  }\n':
    types.HistoricalTokenDocument,
  '\n  query ProposalDetails($proposalId: ID!) {\n    proposal(id: $proposalId) {\n      abstainVotes\n      againstVotes\n      calldatas\n      description\n      descriptionHash\n      executableFrom\n      expiresAt\n      forVotes\n      proposalId\n      proposalNumber\n      proposalThreshold\n      proposer\n      quorumVotes\n      targets\n      timeCreated\n      title\n      values\n      voteEnd\n      voteStart\n      snapshotBlockNumber\n      transactionHash\n      dao {\n        governorAddress\n        tokenAddress\n      }\n    }\n  }\n':
    types.ProposalDetailsDocument,
  '\n  query ProposalVotes($proposalId: ID!) {\n    proposal(id: $proposalId) {\n      votes {\n        reason\n        support\n        voter\n        weight\n      }\n    }\n  }\n':
    types.ProposalVotesDocument,
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
  source: '\n  query AuctionConfig($id: ID!) {\n    dao(id: $id) {\n      auctionConfig {\n        minimumBidIncrement\n        reservePrice\n        timeBuffer\n        duration\n      }\n    }\n  }\n'
): typeof documents['\n  query AuctionConfig($id: ID!) {\n    dao(id: $id) {\n      auctionConfig {\n        minimumBidIncrement\n        reservePrice\n        timeBuffer\n        duration\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query CurrentAuction($id: ID!) {\n    dao(id: $id) {\n      currentAuction {\n        token {\n          tokenId\n        }\n        startTime\n        endTime\n        extended\n        settled\n        winningBid {\n          amount\n          bidder\n        }\n        highestBid {\n          amount\n          bidder\n        }\n        token {\n          tokenId\n        }\n      }\n    }\n  }\n'
): typeof documents['\n  query CurrentAuction($id: ID!) {\n    dao(id: $id) {\n      currentAuction {\n        token {\n          tokenId\n        }\n        startTime\n        endTime\n        extended\n        settled\n        winningBid {\n          amount\n          bidder\n        }\n        highestBid {\n          amount\n          bidder\n        }\n        token {\n          tokenId\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query DaoAddresses($id: ID!) {\n    dao(id: $id) {\n      treasuryAddress\n      auctionAddress\n      governorAddress\n      metadataAddress\n    }\n  }\n'
): typeof documents['\n  query DaoAddresses($id: ID!) {\n    dao(id: $id) {\n      treasuryAddress\n      auctionAddress\n      governorAddress\n      metadataAddress\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query DaoDetails($id: ID!) {\n    dao(id: $id) {\n      name\n      symbol\n      description\n      contractImage\n      projectURI\n      ownerCount\n      totalSupply\n      totalAuctionSales\n      proposalCount\n    }\n  }\n'
): typeof documents['\n  query DaoDetails($id: ID!) {\n    dao(id: $id) {\n      name\n      symbol\n      description\n      contractImage\n      projectURI\n      ownerCount\n      totalSupply\n      totalAuctionSales\n      proposalCount\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query DaoProposals($id: ID!) {\n    dao(id: $id) {\n      proposals(orderDirection: desc, orderBy: timeCreated) {\n        id\n      }\n    }\n  }\n'
): typeof documents['\n  query DaoProposals($id: ID!) {\n    dao(id: $id) {\n      proposals(orderDirection: desc, orderBy: timeCreated) {\n        id\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query HistoricalAuction($id: ID!, $tokenId: BigInt!) {\n    dao(id: $id) {\n      tokens(where: { tokenId: $tokenId }) {\n        tokenId\n        auction {\n          startTime\n          endTime\n          extended\n          winningBid {\n            amount\n            bidder\n          }\n          settled\n          highestBid {\n            bidder\n            amount\n          }\n          bids {\n            bidder\n            amount\n          }\n        }\n      }\n    }\n  }\n'
): typeof documents['\n  query HistoricalAuction($id: ID!, $tokenId: BigInt!) {\n    dao(id: $id) {\n      tokens(where: { tokenId: $tokenId }) {\n        tokenId\n        auction {\n          startTime\n          endTime\n          extended\n          winningBid {\n            amount\n            bidder\n          }\n          settled\n          highestBid {\n            bidder\n            amount\n          }\n          bids {\n            bidder\n            amount\n          }\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query HistoricalToken($id: ID!, $tokenId: BigInt!) {\n    dao(id: $id) {\n      tokens(where: { tokenId: $tokenId }) {\n        tokenId\n        name\n        owner\n        mintedAt\n        image\n      }\n    }\n  }\n'
): typeof documents['\n  query HistoricalToken($id: ID!, $tokenId: BigInt!) {\n    dao(id: $id) {\n      tokens(where: { tokenId: $tokenId }) {\n        tokenId\n        name\n        owner\n        mintedAt\n        image\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query ProposalDetails($proposalId: ID!) {\n    proposal(id: $proposalId) {\n      abstainVotes\n      againstVotes\n      calldatas\n      description\n      descriptionHash\n      executableFrom\n      expiresAt\n      forVotes\n      proposalId\n      proposalNumber\n      proposalThreshold\n      proposer\n      quorumVotes\n      targets\n      timeCreated\n      title\n      values\n      voteEnd\n      voteStart\n      snapshotBlockNumber\n      transactionHash\n      dao {\n        governorAddress\n        tokenAddress\n      }\n    }\n  }\n'
): typeof documents['\n  query ProposalDetails($proposalId: ID!) {\n    proposal(id: $proposalId) {\n      abstainVotes\n      againstVotes\n      calldatas\n      description\n      descriptionHash\n      executableFrom\n      expiresAt\n      forVotes\n      proposalId\n      proposalNumber\n      proposalThreshold\n      proposer\n      quorumVotes\n      targets\n      timeCreated\n      title\n      values\n      voteEnd\n      voteStart\n      snapshotBlockNumber\n      transactionHash\n      dao {\n        governorAddress\n        tokenAddress\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query ProposalVotes($proposalId: ID!) {\n    proposal(id: $proposalId) {\n      votes {\n        reason\n        support\n        voter\n        weight\n      }\n    }\n  }\n'
): typeof documents['\n  query ProposalVotes($proposalId: ID!) {\n    proposal(id: $proposalId) {\n      votes {\n        reason\n        support\n        voter\n        weight\n      }\n    }\n  }\n']

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
