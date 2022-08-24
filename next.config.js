/* eslint-disable @typescript-eslint/no-var-requires */

const { withSentryConfig } = require('@sentry/nextjs')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'interest-cohert=()',
          },
        ],
      },
    ]
  },
  images: {
    domains: ['idoly-assets-curator.vercel.app', 'idoly-assets.outv.im'],
  },
}

const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

const conf =
  process.env.VERCEL_ENV === 'production'
    ? withSentryConfig(nextConfig, sentryWebpackPluginOptions)
    : nextConfig

module.exports = process.env.ANALYZE
  ? require('@next/bundle-analyzer')({
      enabled: true,
    })(conf)
  : conf
