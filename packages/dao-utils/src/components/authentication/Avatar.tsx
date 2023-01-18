/* @ts-ignore */
import * as React from 'react'
import { useEnsName, useEnsAvatar, useAccount } from 'wagmi'
/**
 * Type sizes, or should this be in a global theme object?
 * @returns Avatar Component
 */

export default function Avatar() {
  const { address } = useAccount()
  const { data: ensName } = useEnsName({
    address: address,
  })
  const { data: ensAvatar } = useEnsAvatar({
    address: address,
  })

  if (!ensAvatar) return null

  return (
    <div className="relative overflow-hidden w-8 h-8 rounded-full">
      {ensAvatar ? (
        <img
          className="absolute inset-0 object-fill"
          src={ensAvatar}
          alt={`${ensName}`}
        />
      ) : (
        <div />
      )}
    </div>
  )
}
