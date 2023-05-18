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
  '\n  query NounishAuctions($chain: Chain!, $tokenAddress: String!) {\n    nouns {\n      nounsActiveMarket(\n        where: { collectionAddress: $tokenAddress }\n        network: { network: ETHEREUM, chain: $chain }\n      ) {\n        duration\n        endTime\n        highestBidder\n        metadata\n        status\n        tokenId\n        winner\n        highestBidPrice {\n          chainTokenPrice {\n            decimal\n            raw\n          }\n          usdcPrice {\n            decimal\n            raw\n          }\n        }\n        reservePrice {\n          chainTokenPrice {\n            decimal\n            raw\n          }\n        }\n        startTime\n        timeBuffer\n        treasury\n        extended\n        firstBidTime\n        estimatedDurationTime\n        auction\n        minBidIncrementPercentage\n        address\n      }\n    }\n  }\n':
    types.NounishAuctionsDocument,
  '\n  query NounishCollections($chain: Chain!, $tokenAddress: [String!]) {\n    aggregateStat {\n      nftCount(\n        where: { collectionAddresses: $tokenAddress }\n        networks: { network: ETHEREUM, chain: $chain }\n      )\n      ownerCount(\n        where: { collectionAddresses: $tokenAddress }\n        networks: { network: ETHEREUM, chain: $chain }\n      )\n    }\n  }\n':
    types.NounishCollectionsDocument,
  '\n  query NounishProposals($chain: Chain!, $tokenAddress: [String!]) {\n    nouns {\n      nounsProposals(\n        where: { collectionAddresses: $tokenAddress }\n        networks: { network: ETHEREUM, chain: $chain }\n        sort: { sortDirection: DESC, sortKey: CREATED }\n      ) {\n        nodes {\n          abstainVotes\n          againstVotes\n          auction\n          calldatas\n          collectionAddress\n          description\n          descriptionHash\n          executableFrom\n          expiresAt\n          forVotes\n          governor\n          manager\n          metadata\n          networkInfo {\n            chain\n            network\n          }\n          proposalId\n          proposalNumber\n          proposalThreshold\n          proposer\n          quorumVotes\n          status\n          targets\n          timeCreated\n          title\n          transactionInfo {\n            blockNumber\n            blockTimestamp\n          }\n          treasury\n          values\n          voteEnd\n          voteStart\n          votes {\n            proposalId\n            reason\n            support\n            transactionInfo {\n              blockNumber\n              blockTimestamp\n            }\n            voter\n            weight\n          }\n        }\n      }\n    }\n  }\n':
    types.NounishProposalsDocument,
  '\n  query NounishTokens($chain: Chain!, $tokenAddress: String!, $tokenId: String!) {\n    token(\n      token: { address: $tokenAddress, tokenId: $tokenId }\n      network: { network: ETHEREUM, chain: $chain }\n    ) {\n      token {\n        metadata\n        owner\n        lastRefreshTime\n        mintInfo {\n          mintContext {\n            blockNumber\n          }\n        }\n      }\n    }\n  }\n':
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
  source: '\n  query NounishAuctions($chain: Chain!, $tokenAddress: String!) {\n    nouns {\n      nounsActiveMarket(\n        where: { collectionAddress: $tokenAddress }\n        network: { network: ETHEREUM, chain: $chain }\n      ) {\n        duration\n        endTime\n        highestBidder\n        metadata\n        status\n        tokenId\n        winner\n        highestBidPrice {\n          chainTokenPrice {\n            decimal\n            raw\n          }\n          usdcPrice {\n            decimal\n            raw\n          }\n        }\n        reservePrice {\n          chainTokenPrice {\n            decimal\n            raw\n          }\n        }\n        startTime\n        timeBuffer\n        treasury\n        extended\n        firstBidTime\n        estimatedDurationTime\n        auction\n        minBidIncrementPercentage\n        address\n      }\n    }\n  }\n'
): typeof documents['\n  query NounishAuctions($chain: Chain!, $tokenAddress: String!) {\n    nouns {\n      nounsActiveMarket(\n        where: { collectionAddress: $tokenAddress }\n        network: { network: ETHEREUM, chain: $chain }\n      ) {\n        duration\n        endTime\n        highestBidder\n        metadata\n        status\n        tokenId\n        winner\n        highestBidPrice {\n          chainTokenPrice {\n            decimal\n            raw\n          }\n          usdcPrice {\n            decimal\n            raw\n          }\n        }\n        reservePrice {\n          chainTokenPrice {\n            decimal\n            raw\n          }\n        }\n        startTime\n        timeBuffer\n        treasury\n        extended\n        firstBidTime\n        estimatedDurationTime\n        auction\n        minBidIncrementPercentage\n        address\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query NounishCollections($chain: Chain!, $tokenAddress: [String!]) {\n    aggregateStat {\n      nftCount(\n        where: { collectionAddresses: $tokenAddress }\n        networks: { network: ETHEREUM, chain: $chain }\n      )\n      ownerCount(\n        where: { collectionAddresses: $tokenAddress }\n        networks: { network: ETHEREUM, chain: $chain }\n      )\n    }\n  }\n'
): typeof documents['\n  query NounishCollections($chain: Chain!, $tokenAddress: [String!]) {\n    aggregateStat {\n      nftCount(\n        where: { collectionAddresses: $tokenAddress }\n        networks: { network: ETHEREUM, chain: $chain }\n      )\n      ownerCount(\n        where: { collectionAddresses: $tokenAddress }\n        networks: { network: ETHEREUM, chain: $chain }\n      )\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query NounishProposals($chain: Chain!, $tokenAddress: [String!]) {\n    nouns {\n      nounsProposals(\n        where: { collectionAddresses: $tokenAddress }\n        networks: { network: ETHEREUM, chain: $chain }\n        sort: { sortDirection: DESC, sortKey: CREATED }\n      ) {\n        nodes {\n          abstainVotes\n          againstVotes\n          auction\n          calldatas\n          collectionAddress\n          description\n          descriptionHash\n          executableFrom\n          expiresAt\n          forVotes\n          governor\n          manager\n          metadata\n          networkInfo {\n            chain\n            network\n          }\n          proposalId\n          proposalNumber\n          proposalThreshold\n          proposer\n          quorumVotes\n          status\n          targets\n          timeCreated\n          title\n          transactionInfo {\n            blockNumber\n            blockTimestamp\n          }\n          treasury\n          values\n          voteEnd\n          voteStart\n          votes {\n            proposalId\n            reason\n            support\n            transactionInfo {\n              blockNumber\n              blockTimestamp\n            }\n            voter\n            weight\n          }\n        }\n      }\n    }\n  }\n'
): typeof documents['\n  query NounishProposals($chain: Chain!, $tokenAddress: [String!]) {\n    nouns {\n      nounsProposals(\n        where: { collectionAddresses: $tokenAddress }\n        networks: { network: ETHEREUM, chain: $chain }\n        sort: { sortDirection: DESC, sortKey: CREATED }\n      ) {\n        nodes {\n          abstainVotes\n          againstVotes\n          auction\n          calldatas\n          collectionAddress\n          description\n          descriptionHash\n          executableFrom\n          expiresAt\n          forVotes\n          governor\n          manager\n          metadata\n          networkInfo {\n            chain\n            network\n          }\n          proposalId\n          proposalNumber\n          proposalThreshold\n          proposer\n          quorumVotes\n          status\n          targets\n          timeCreated\n          title\n          transactionInfo {\n            blockNumber\n            blockTimestamp\n          }\n          treasury\n          values\n          voteEnd\n          voteStart\n          votes {\n            proposalId\n            reason\n            support\n            transactionInfo {\n              blockNumber\n              blockTimestamp\n            }\n            voter\n            weight\n          }\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query NounishTokens($chain: Chain!, $tokenAddress: String!, $tokenId: String!) {\n    token(\n      token: { address: $tokenAddress, tokenId: $tokenId }\n      network: { network: ETHEREUM, chain: $chain }\n    ) {\n      token {\n        metadata\n        owner\n        lastRefreshTime\n        mintInfo {\n          mintContext {\n            blockNumber\n          }\n        }\n      }\n    }\n  }\n'
): typeof documents['\n  query NounishTokens($chain: Chain!, $tokenAddress: String!, $tokenId: String!) {\n    token(\n      token: { address: $tokenAddress, tokenId: $tokenId }\n      network: { network: ETHEREUM, chain: $chain }\n    ) {\n      token {\n        metadata\n        owner\n        lastRefreshTime\n        mintInfo {\n          mintContext {\n            blockNumber\n          }\n        }\n      }\n    }\n  }\n']

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
