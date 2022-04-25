const enableSentryInDev = false
const sentryDsn =
  'https://320b121364914f0d8b879120f38e6296@o421264.ingest.sentry.io/6358666'

export default function getSentryDSN() {
  const isProd = process.env.NODE_ENV === 'production'
  if (isProd || enableSentryInDev) {
    return (
      process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN ?? sentryDsn
    )
  } else {
    return ''
  }
}
