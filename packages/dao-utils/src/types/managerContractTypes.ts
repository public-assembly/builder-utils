import { HexString } from './wagmiTypes'
import { PropsWithChildren } from 'react'

export type ManagerProviderProps = PropsWithChildren<{
  tokenAddress: HexString
}>

export type ManagerReturnTypes = {
  tokenAddress?: HexString
  daoAddresses: DaoAddresses
  isLoading: boolean
  isError: boolean
}

export type DaoAddresses = {
  metadataAddress: string
  auctionAddress: string
  treasuryAddress: string
  governorAddress: string
} | null
