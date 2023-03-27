import * as React from 'react'
import { useContract, useProvider, useSigner } from 'wagmi'
import { auctionAbi, tokenAbi, metadataAbi } from '../abi'
import { GetContractResult } from '@wagmi/core'

/* 
  TODO define exact contract result types 
  These types should work (but don't) and do when using @wagmi/core:getContract instead of wagmi:useContract
  auctionContract: GetContractResult<typeof auctionAbi> | null
  tokenContract: GetContractResult<typeof tokenAbi> | null
  metadataContract: GetContractResult<typeof metadataAbi> | null
*/
interface NounsProtocolContracts {
  auctionContract: GetContractResult | null
  tokenContract: GetContractResult | null
  metadataContract: GetContractResult | null
}

export type NounsProtocolAddresses = {
  /**
   * Pass in the dao contract auction address if you want to interact with the auction
   */
  auctionAddress?: string
  /**
   * Pass in the dao contract token address
   */
  tokenAddress?: string
  /**
   * Pass in the dao metadata renderer address
   */
  metadataRendererAddress?: string
}

export function useNounsProtocol({
  auctionAddress,
  tokenAddress,
  metadataRendererAddress,
}: NounsProtocolAddresses): NounsProtocolContracts {
  const provider = useProvider()
  const { data: signer } = useSigner()

  const auctionContract = useContract({
    address: auctionAddress,
    abi: auctionAbi,
    signerOrProvider: signer,
  })

  const tokenContract = useContract({
    address: tokenAddress,
    abi: tokenAbi,
    signerOrProvider: provider,
  })

  const metadataContract = useContract({
    address: metadataRendererAddress,
    abi: metadataAbi,
    signerOrProvider: provider,
  })

  return {
    auctionContract: auctionContract,
    tokenContract: tokenContract,
    metadataContract: metadataContract,
  }
}
