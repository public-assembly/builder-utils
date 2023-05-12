import {
  useAccount,
  useDisconnect,
  useNetwork,
  usePublicClient,
  useWalletClient,
  useBalance,
  useEnsName,
  useEnsAvatar,
} from 'wagmi'
import { shortenAddress } from '@public-assembly/builder-utils'

export function useAuth() {
  const provider = usePublicClient()

  const { data: signer } = useWalletClient()
  const { address, isConnecting } = useAccount()
  const { data: ensName } = useEnsName({
    address: address,
  })
  const { data: ensAvatar } = useEnsAvatar({
    name: address,
  })
  const { disconnect } = useDisconnect()
  const { chain } = useNetwork()
  const { data: balance } = useBalance({ address: address })

  return {
    provider,
    signer,
    address: address,
    ensName: ensName || shortenAddress(address),
    ensAvatar: ensAvatar,
    displayName: ensName || shortenAddress(address),
    balance: balance,
    loading: isConnecting,
    logout: disconnect,
    chain,
  }
}
