/**
 * https://github.com/ourzora/nouns-builder/blob/dca7e85756e86518a4780b3817931e4d4cc6db10/apps/web/src/constants/rpc.ts
 */

export const ALCHEMY_RPC_URL = {
  1: `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
  5: `https://eth-goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
}[process.env.NEXT_PUBLIC_CHAIN_ID || 1]
