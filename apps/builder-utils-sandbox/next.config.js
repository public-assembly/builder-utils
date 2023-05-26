/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    esmExternals: 'loose',
  },
  transpilePackages: ['@public-assembly/builder-utils'],
}

module.exports = nextConfig
