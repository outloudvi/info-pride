/* eslint-disable @typescript-eslint/no-var-requires */

const { withSentryConfig } = require('@sentry/nextjs')

const { i18n } = require('./next-i18next.config.js')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
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

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions)
