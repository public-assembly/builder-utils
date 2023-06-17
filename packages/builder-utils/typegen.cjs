/** @type {import('@graphql-codegen/cli').CodegenConfig} */

const config = {
  overwrite: true,
  schema: 'https://api.thegraph.com/subgraphs/name/neokry/nouns-builder-mainnet',
  documents: [
    'src/subgraph/queries/daoAddresses.ts',
  ],
  generates: {
    'src/subgraph/types/': {
      preset: 'client',
      plugins: [],
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
}

module.exports = config
