/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('node:fs')
const cp = require('node:child_process')

const { withSentryConfig } = require('@sentry/nextjs')

const locales = require('./locales/locales.json')

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
    async redirects() {
        return [
            {
                source: '/search',
                destination: '/search/card',
                permanent: true,
            },
        ]
    },
    images: {
        domains: ['idoly-assets-curator.vercel.app', 'idoly-assets.outv.im'],
        unoptimized: true,
    },
    i18n: {
        locales,
        defaultLocale: 'zh-Hans',
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

const generateGlobalData = () => {
    fs.writeFileSync(
        'data/build.json',
        JSON.stringify({
            rev: cp.execSync('git rev-parse HEAD').toString().trim(),
        })
    )

    return true
}

module.exports =
    generateGlobalData() &&
    (process.env.ANALYZE
        ? require('@next/bundle-analyzer')({
              enabled: true,
          })(conf)
        : conf)
