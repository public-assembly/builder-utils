import { Hex } from './misc'
import { PropsWithChildren } from 'react'

export type ManagerProviderProps = PropsWithChildren<{
  tokenAddress: Hex
}>

export type ManagerReturnTypes = {
  tokenAddress?: Hex
  daoAddresses: DaoAddresses
}

export type DaoAddresses = {
  metadataAddress: Hex
  auctionAddress: Hex
  treasuryAddress: Hex
  governorAddress: Hex
} | null
