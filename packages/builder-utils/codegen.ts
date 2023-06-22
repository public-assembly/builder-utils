import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'https://api.thegraph.com/subgraphs/name/neokry/nouns-builder-mainnet',
  documents: ['src/subgraph/queries'],
  generates: {
    'src/subgraph/types/': {
      preset: 'client',
    },
  },
}

module.exports = config
