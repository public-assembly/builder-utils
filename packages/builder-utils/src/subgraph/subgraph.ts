export const PUBLIC_SUBGRAPH_URL = {
  1: 'https://api.thegraph.com/subgraphs/name/neokry/nouns-builder-mainnet',
  5: 'https://api.thegraph.com/subgraphs/name/neokry/nouns-builder-goerli',
  999: 'https://api.goldsky.com/api/public/project_clkk1ucdyf6ak38svcatie9tf/subgraphs/nouns-builder-zora-testnet/stable/gn',
  7777777:
    'https://api.goldsky.com/api/public/project_clkk1ucdyf6ak38svcatie9tf/subgraphs/nouns-builder-zora-mainnet/stable/gn',
  8453: 'https://api.goldsky.com/api/public/project_clkk1ucdyf6ak38svcatie9tf/subgraphs/nouns-builder-base-mainnet/stable/gn',
}[process.env.NEXT_PUBLIC_CHAIN_ID || 1] as string
