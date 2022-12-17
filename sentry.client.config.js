// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'
import { Replay } from '@sentry/replay'

import getSentryDSN from './sentryUtils'

Sentry.init({
    dsn: getSentryDSN(),
    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 0.8,
    // This sets the sample rate to be 10%. You may want this to be 100% while
    // in development and sample at a lower rate in production
    replaysSessionSampleRate: 0.1,
    // If the entire session is not sampled, use the below sample rate to sample
    // sessions when an error occurs.
    replaysOnErrorSampleRate: 1.0,

    integrations: [new Replay()],
})
