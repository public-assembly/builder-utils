// Authentication Components
import AuthCheck from './components/authentication/AuthCheck'

// Auction Components
import AuctionCountdown from './components/AuctionCountdown'
import CircleArrow from './components/CircleArrow'
import CurrentAuction from './components/CurrentAuction'
import TokenExplorer from './components/TokenExplorer'
import TokenHolder from './components/TokenHolder'
import TokenRenderer from './components/TokenRenderer'
import TokenThumbnail from './components/TokenThumbnail'
import TokenTitle from './components/TokenTitle'
import TokenWinningBid from './components/TokenWinningBid'

// Proposal Components
import ProposalCard from './components/ProposalCard'
import ProposalCardGrid from './components/ProposalCardGrid'
import ProposalDescription from './components/ProposalDescription'
import ProposalPage from './components/ProposalPage'
import ProposalPageGrid from './components/ProposalPageGrid'
import ProposalStatus from './components/ProposalStatus'
import ProposalTimestamp from './components/ProposalTimestamp'
import ProposalTitle from './components/ProposalTitle'
import ProposalVoting from './components/ProposalVoting'
import Proposer from './components/Proposer'

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
