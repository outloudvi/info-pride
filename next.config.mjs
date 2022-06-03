import { withSentryConfig } from '@sentry/nextjs'

import { i18n } from './next-i18next.config.mjs'

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
}

const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

export default withSentryConfig(nextConfig, sentryWebpackPluginOptions)
