/** @type {import('next').NextConfig} */

const withTMwithMDX = require('next-transpile-modules')(['@public-assembly/dao-utils'])(
  '@next/mdx'
)({
  extension: /\.mdx?$/,
})

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
}

module.exports = withTMwithMDX(nextConfig)
