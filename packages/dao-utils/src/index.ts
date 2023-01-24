import CurrentAuction from './components/CurrentAuction'
import TokenExplorer from './components/TokenExplorer'
import AuthCheck from './components/authentication/AuthCheck'

import {
  useCountdown,
  useDaoAuctionQuery,
  useDaoToken,
  useBidder,
  useActiveAuction,
  useNounsProtocol,
} from './hooks'

import { useAuctionProvider, AuctionProvider } from './context/AuctionProvider'
import { useManagerProvider, ManagerProvider } from './context/ManagerProvider'

import { shortenAddress, zoraApiFetcher, etherscanLink } from './lib'

export {
  /**
   * Components
   */
  CurrentAuction,
  TokenExplorer,
  AuthCheck,
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
   * PROVIDERS
   */
  AuctionProvider,
  useAuctionProvider,
  ManagerProvider,
  useManagerProvider,
}
