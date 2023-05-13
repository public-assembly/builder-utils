import { Hex } from 'viem'
import { PropsWithChildren } from 'react'

export type ManagerProviderProps = PropsWithChildren<{
  tokenAddress: Hex
}>

export type ManagerReturnTypes = {
  tokenAddress?: Hex
  daoAddresses: DaoAddresses
}

export type DaoAddresses = {
  metadataAddress: string
  auctionAddress: string
  treasuryAddress: string
  governorAddress: string
} | null
