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

import { AuthCheck, Avatar, Connect } from './components/authentication'

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
  VoteTally,
} from './components/proposal'

import {
  useCountdown,
  useDaoAuctionQuery,
  useDaoToken,
  useBidder,
  useActiveAuction,
  useNounsProtocol,
} from './hooks'

import {
  useAuctionContext,
  AuctionProvider,
  useGovernorContext,
  GovernorProvider,
  useManagerContext,
  ManagerProvider,
} from './context'

import { shortenAddress, zoraApiFetcher, etherscanLink } from './lib'

export {
  /**
   * Authentication Components
   */
  AuthCheck,
  Avatar,
  Connect,
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
  VoteTally,
  /**
   * Hooks
   */
  useCountdown,
  useDaoAuctionQuery,
  useDaoToken,
  useBidder,
  useActiveAuction,
  useNounsProtocol,
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
}
