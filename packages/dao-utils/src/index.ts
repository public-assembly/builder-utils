import {
  AuctionCountdown,
  CircleArrow,
  CurrentAuction,
  TokenExplorer,
  TokenHolder,
  TokenRenderer,
  TokenThumbnail,
  TokenTitle,
  TokenWinningBid,
} from './components/auction'

import { AuthCheck, Avatar } from './components/authentication'

import {
  ProposalCard,
  ProposalCardGrid,
  ProposalDescription,
  ProposalPage,
  ProposalPageGrid,
  ProposalStatus,
  ProposalTimestamp,
  ProposalTitle,
  ProposalVoting,
  Proposer,
} from './components/proposals'

import {
  useActiveAuction,
  useBidder,
  useCountdown,
  useDaoAuctionQuery,
  useDaoCollectionQuery,
  useDaoProposalQuery,
  useDaoToken,
  useInterval,
  useVote,
} from './hooks'

import { useAuctionContext, AuctionProvider } from './context/AuctionProvider'
import { useGovernorContext, GovernorProvider } from './context/GovernorProvider'
import { useManagerContext, ManagerProvider } from './context/ManagerProvider'
import { useMetadataContext, MetadataProvider } from './context/MetadataProvider'
import { useTokenContext, TokenProvider } from './context/TokenProvider'

import { shortenAddress, zoraApiFetcher, etherscanLink } from './lib'

import { auctionAbi, governorAbi, managerAbi, metadataAbi, tokenAbi } from './abi'

export {
  /**
   * Authentication Components
   */
  AuthCheck,
  Avatar,
  /**
   * Auction Components
   */
  AuctionCountdown,
  CircleArrow,
  CurrentAuction,
  TokenExplorer,
  TokenHolder,
  TokenRenderer,
  TokenThumbnail,
  TokenTitle,
  TokenWinningBid,
  /**
   * Proposal Components
   */
  ProposalCard,
  ProposalCardGrid,
  ProposalDescription,
  ProposalPage,
  ProposalPageGrid,
  ProposalStatus,
  ProposalTimestamp,
  ProposalTitle,
  ProposalVoting,
  Proposer,
  /**
   * Hooks
   */
  useActiveAuction,
  useBidder,
  useCountdown,
  useDaoAuctionQuery,
  useDaoCollectionQuery,
  useDaoProposalQuery,
  useDaoToken,
  useInterval,
  useVote,
  /**
   * Utility Functions
   */
  etherscanLink,
  shortenAddress,
  zoraApiFetcher,
  /**
   * Providers & Context
   */
  useAuctionContext,
  AuctionProvider,
  useGovernorContext,
  GovernorProvider,
  useManagerContext,
  ManagerProvider,
  useMetadataContext,
  MetadataProvider,
  useTokenContext,
  TokenProvider,
  /**
   * Abis
   */
  auctionAbi,
  governorAbi,
  managerAbi,
  metadataAbi,
  tokenAbi,
}
