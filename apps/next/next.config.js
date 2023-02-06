/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['@public-assembly/dao-utils'])
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  experimental: {
    esmExternals: 'loose',
  },
}

module.exports = withMDX(withTM(nextConfig))
