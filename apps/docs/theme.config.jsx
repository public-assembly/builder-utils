export default {
  logo: <span>Builder Utils</span>,
  project: {
    link: 'https://github.com/public-assembly/builder-utils',
  },
  footer: {
    text: 'Built by Public Assembly',
  },
  docsRepositoryBase:
    'https://github.com/public-assembly/builder-utils/tree/main/apps/docs/pages',
  useNextSeoProps() {
    return {
      titleTemplate: `%s - Builder Utils`,
    }
  },
  primaryHue: 190,
}
