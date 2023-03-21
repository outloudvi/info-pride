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
    sentry: {
        // Use `hidden-source-map` rather than `source-map` as the Webpack `devtool`
        // for client-side builds. (This will be the default starting in
        // `@sentry/nextjs` version 8.0.0.) See
        // https://webpack.js.org/configuration/devtool/ and
        // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-hidden-source-map
        // for more information.
        hideSourceMaps: true,
    },
}

const sentryWebpackPluginOptions = {
    // Additional config options for the Sentry Webpack plugin. Keep in mind that
    // the following options are set automatically, and overriding them is not
    // recommended:
    //   release, url, org, project, authToken, configFile, stripPrefix,
    //   urlPrefix, include, ignore

    silent: true, // Suppresses all logs
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options.
}

const conf = withSentryConfig(nextConfig, sentryWebpackPluginOptions)

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
