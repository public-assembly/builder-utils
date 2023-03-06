/** @type {import('@graphql-codegen/cli').CodegenConfig} */

const config = {
  overwrite: true,
  schema: 'https://api.zora.co/graphql',
  documents: [
    'src/data/daoAuctionQuery.ts',
    'src/data/daoCollectionQuery.ts',
    'src/data/daoProposalQuery.ts',
    'src/data/daoTokenQuery.ts',
  ],
  generates: {
    'src/types/': {
      preset: 'client',
      plugins: [],
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
}

module.exports = config
