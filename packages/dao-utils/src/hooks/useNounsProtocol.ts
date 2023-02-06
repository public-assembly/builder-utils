import * as React from 'react'
import { useContract, useProvider, useSigner } from 'wagmi'
import { auctionAbi, tokenAbi, metadataAbi } from '../abi'

interface NounsProtocolContracts {
  /**
   * TODO: Update types
   */
  auctionContract: any
  tokenContract: any
  metadataContract: any
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
