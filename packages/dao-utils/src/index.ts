import CurrentAuction from './components/CurrentAuction'
import TokenExplorer from './components/TokenExplorer'
import AuthCheck from './components/authentication/AuthCheck'

// import ProposalCardRenderer from './components/ProposalCardRenderer'
import ProposalCardGrid from './components/ProposalCardGrid'

import {
  useCountdown,
  useDaoAuctionQuery,
  useDaoToken,
  useBidder,
  useActiveAuction,
  useNounsProtocol,
} from './hooks'

import { useAuctionContext, AuctionProvider } from './context/AuctionProvider'
import { useGovernorContext, GovernorProvider } from './context/GovernorProvider'
import { useManagerContext, ManagerProvider } from './context/ManagerProvider'

import { shortenAddress, zoraApiFetcher, etherscanLink } from './lib'

export {
  /**
   * Auction Components
   */
  CurrentAuction,
  TokenExplorer,
  AuthCheck,
  /**
   * Proposal Components
   */
  ProposalCardGrid,
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
