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
  '\n  query NounishAuctions($collectionAddress: String!) {\n    nouns {\n      nounsActiveMarket(where: { collectionAddress: $collectionAddress }) {\n        duration\n        endTime\n        highestBidder\n        metadata\n        status\n        tokenId\n        winner\n        highestBidPrice {\n          chainTokenPrice {\n            decimal\n            raw\n          }\n          usdcPrice {\n            decimal\n            raw\n          }\n        }\n        reservePrice {\n          chainTokenPrice {\n            decimal\n            raw\n          }\n        }\n        startTime\n        timeBuffer\n        treasury\n        extended\n        firstBidTime\n        estimatedDurationTime\n        auction\n        minBidIncrementPercentage\n        address\n      }\n    }\n  }\n':
    types.NounishAuctionsDocument,
  '\n  query NounishCollections($tokenAddress: [String!]) {\n    aggregateStat {\n      nftCount(where: { collectionAddresses: $tokenAddress })\n      ownerCount(where: { collectionAddresses: $tokenAddress })\n    }\n  }\n':
    types.NounishCollectionsDocument,
  '\n  query NounishProposals($tokenAddress: [String!]) {\n    nouns {\n      nounsProposals(\n        where: { collectionAddresses: $tokenAddress }\n        sort: { sortDirection: DESC, sortKey: CREATED }\n      ) {\n        nodes {\n          abstainVotes\n          againstVotes\n          auction\n          calldatas\n          collectionAddress\n          description\n          descriptionHash\n          executableFrom\n          expiresAt\n          forVotes\n          governor\n          manager\n          metadata\n          proposalId\n          proposalNumber\n          proposalThreshold\n          proposer\n          quorumVotes\n          status\n          targets\n          timeCreated\n          title\n          treasury\n          values\n          voteEnd\n          voteStart\n          votes {\n            proposalId\n            reason\n            support\n            voter\n            weight\n          }\n        }\n      }\n    }\n  }\n':
    types.NounishProposalsDocument,
  '\n  query NounishTokens($tokenAddress: String!, $tokenId: String!) {\n    token(token: { address: $tokenAddress, tokenId: $tokenId }) {\n      token {\n        metadata\n        owner\n        lastRefreshTime\n        mintInfo {\n          mintContext {\n            blockNumber\n          }\n        }\n      }\n    }\n  }\n':
    types.NounishTokensDocument,
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
  source: '\n  query NounishAuctions($collectionAddress: String!) {\n    nouns {\n      nounsActiveMarket(where: { collectionAddress: $collectionAddress }) {\n        duration\n        endTime\n        highestBidder\n        metadata\n        status\n        tokenId\n        winner\n        highestBidPrice {\n          chainTokenPrice {\n            decimal\n            raw\n          }\n          usdcPrice {\n            decimal\n            raw\n          }\n        }\n        reservePrice {\n          chainTokenPrice {\n            decimal\n            raw\n          }\n        }\n        startTime\n        timeBuffer\n        treasury\n        extended\n        firstBidTime\n        estimatedDurationTime\n        auction\n        minBidIncrementPercentage\n        address\n      }\n    }\n  }\n'
): (typeof documents)['\n  query NounishAuctions($collectionAddress: String!) {\n    nouns {\n      nounsActiveMarket(where: { collectionAddress: $collectionAddress }) {\n        duration\n        endTime\n        highestBidder\n        metadata\n        status\n        tokenId\n        winner\n        highestBidPrice {\n          chainTokenPrice {\n            decimal\n            raw\n          }\n          usdcPrice {\n            decimal\n            raw\n          }\n        }\n        reservePrice {\n          chainTokenPrice {\n            decimal\n            raw\n          }\n        }\n        startTime\n        timeBuffer\n        treasury\n        extended\n        firstBidTime\n        estimatedDurationTime\n        auction\n        minBidIncrementPercentage\n        address\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query NounishCollections($tokenAddress: [String!]) {\n    aggregateStat {\n      nftCount(where: { collectionAddresses: $tokenAddress })\n      ownerCount(where: { collectionAddresses: $tokenAddress })\n    }\n  }\n'
): (typeof documents)['\n  query NounishCollections($tokenAddress: [String!]) {\n    aggregateStat {\n      nftCount(where: { collectionAddresses: $tokenAddress })\n      ownerCount(where: { collectionAddresses: $tokenAddress })\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query NounishProposals($tokenAddress: [String!]) {\n    nouns {\n      nounsProposals(\n        where: { collectionAddresses: $tokenAddress }\n        sort: { sortDirection: DESC, sortKey: CREATED }\n      ) {\n        nodes {\n          abstainVotes\n          againstVotes\n          auction\n          calldatas\n          collectionAddress\n          description\n          descriptionHash\n          executableFrom\n          expiresAt\n          forVotes\n          governor\n          manager\n          metadata\n          proposalId\n          proposalNumber\n          proposalThreshold\n          proposer\n          quorumVotes\n          status\n          targets\n          timeCreated\n          title\n          treasury\n          values\n          voteEnd\n          voteStart\n          votes {\n            proposalId\n            reason\n            support\n            voter\n            weight\n          }\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query NounishProposals($tokenAddress: [String!]) {\n    nouns {\n      nounsProposals(\n        where: { collectionAddresses: $tokenAddress }\n        sort: { sortDirection: DESC, sortKey: CREATED }\n      ) {\n        nodes {\n          abstainVotes\n          againstVotes\n          auction\n          calldatas\n          collectionAddress\n          description\n          descriptionHash\n          executableFrom\n          expiresAt\n          forVotes\n          governor\n          manager\n          metadata\n          proposalId\n          proposalNumber\n          proposalThreshold\n          proposer\n          quorumVotes\n          status\n          targets\n          timeCreated\n          title\n          treasury\n          values\n          voteEnd\n          voteStart\n          votes {\n            proposalId\n            reason\n            support\n            voter\n            weight\n          }\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query NounishTokens($tokenAddress: String!, $tokenId: String!) {\n    token(token: { address: $tokenAddress, tokenId: $tokenId }) {\n      token {\n        metadata\n        owner\n        lastRefreshTime\n        mintInfo {\n          mintContext {\n            blockNumber\n          }\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query NounishTokens($tokenAddress: String!, $tokenId: String!) {\n    token(token: { address: $tokenAddress, tokenId: $tokenId }) {\n      token {\n        metadata\n        owner\n        lastRefreshTime\n        mintInfo {\n          mintContext {\n            blockNumber\n          }\n        }\n      }\n    }\n  }\n']

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
