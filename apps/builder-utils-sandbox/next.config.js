/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['@public-assembly/builder-utils'])

const nextConfig = {
  reactStrictMode: true,
  // transpilePackages: ['@public-assembly/builder-utils'],
  // experimental: {
  //   esmExternals: 'loose',
  // },
}

module.exports = withTM(nextConfig)
