import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://api.thegraph.com/subgraphs/name/neokry/nouns-builder-mainnet',
  documents: [
    'src/subgraph/queries/auctionConfig.ts',
    'src/subgraph/queries/currentAuction.ts',
    'src/subgraph/queries/daoAddresses.ts',
    'src/subgraph/queries/historicalAuction.ts',
    'src/subgraph/queries/historicalToken.ts',
  ],
  generates: {
    'src/subgraph/types/': {
      preset: 'client',
      plugins: ['typescript'],
    },
  },
}

module.exports = config
