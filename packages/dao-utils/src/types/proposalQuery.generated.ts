export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Date: any
}

export type Query = {
  __typename?: 'Query'
  nouns: Nouns
}

export type Nouns = {
  __typename?: 'Nouns'
  nounsProposals: NounsProposalsConnection
}

export type NounsNounsProposalsArgs = {
  where?: InputMaybe<NounsProposalsWhereInput>
  sort?: InputMaybe<NounsProposalsSortInput>
}

export type NounsProposalsWhereInput = {
  collectionAddresses?: InputMaybe<Array<Scalars['String']>>
}

export type NounsProposalsSortInput = {
  sortDirection: SortDirection
  sortKey: NounsProposalsSortKey
}

export enum SortDirection {
  Desc = 'DESC',
}

export enum NounsProposalsSortKey {
  Created = 'CREATED',
}

export type NounsProposalsConnection = {
  __typename?: 'NounsProposalsConnection'
  nodes: Array<NounsProposal>
}

export type NounsProposal = {
  proposal:
    | {
        abstainVotes: Scalars['Int']
        againstVotes: Scalars['Int']
        auction: Auction
        calldatas: Array<Scalars['String']>
        collectionAddress: Scalars['String']
        description: Scalars['String']
        descriptionHash: Scalars['String']
        executableFrom: Scalars['Date']
        expiresAt: Scalars['Date']
        forVotes: Scalars['Int']
        governor: Scalars['String']
        manager: Scalars['String']
        metadata: Scalars['String']
        proposalId: Scalars['String']
        proposalNumber: Scalars['Int']
        proposalThreshold: Scalars['String']
        proposer: Scalars['String']
        quorumVotes: Scalars['String']
        status: Scalars['String']
        targets: Array<Scalars['String']>
        timeCreated: Scalars['Date']
        title: Scalars['String']
        treasury: Scalars['String']
        values: Array<Scalars['String']>
        voteEnd: Scalars['Date']
        voteStart: Scalars['Date']
        votes: Array<NounsProposalVote>
      }
    | undefined
}

export type Auction = {
  __typename?: 'Auction'
  begin: Scalars['Date']
  end: Scalars['Date']
  id: Scalars['String']
}

export type NounsProposalVote = {
  __typename?: 'NounsProposalVote'
  proposalId: Scalars['String']
  reason: Scalars['String']
  support: Scalars['String']
  voter: Scalars['String']
  weight: Scalars['Int']
}

export type NounishProposalQuery = {
  __typename?: 'RootQuery'
  nouns: {
    __typename?: 'Nouns'
    nounsProposals?: {
      nodes: Array<{
        abstainVotes: Scalars['Int']
        againstVotes: Scalars['Int']
        auction: Auction
        calldatas: Array<Scalars['String']>
        collectionAddress: Scalars['String']
        description: Scalars['String']
        descriptionHash: Scalars['String']
        executableFrom: Scalars['Date']
        expiresAt: Scalars['Date']
        forVotes: Scalars['Int']
        governor: Scalars['String']
        manager: Scalars['String']
        metadata: Scalars['String']
        proposalId: Scalars['String']
        proposalNumber: Scalars['Int']
        proposalThreshold: Scalars['String']
        proposer: Scalars['String']
        quorumVotes: Scalars['String']
        status: Scalars['String']
        targets: Array<Scalars['String']>
        timeCreated: Scalars['Date']
        title: Scalars['String']
        treasury: Scalars['String']
        values: Array<Scalars['String']>
        voteEnd: Scalars['Date']
        voteStart: Scalars['Date']
        votes: Array<NounsProposalVote>
      }>
    }
  }
}
