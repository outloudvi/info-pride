// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

import getSentryDSN from './sentryUtils'

Sentry.init({
    dsn: getSentryDSN(),

    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 0.5,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,

    replaysOnErrorSampleRate: 0.2,
    replaysSessionSampleRate: 0.05,
})
