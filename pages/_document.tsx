import { createHash } from 'node:crypto'

import { createGetInitialProps } from '@mantine/next'
import Document, { Head, Html, Main, NextScript } from 'next/document'

const getInitialProps = createGetInitialProps()

const allowedConnectionDomains = [
  // Scripts from Next.js
  "'self'",
  // Backend for INFO PRIDE
  'idoly-backend.outv.im',
  // Vercel's Analytics
  'vitals.vercel-insights.com',
  // Sentry's reporting & performance measurement
  'o421264.ingest.sentry.io',
]

const cspRules = (scriptOthers: string) =>
  [
    `script-src 'self' ${scriptOthers}`,
    `connect-src ${allowedConnectionDomains.join(' ')}`,
  ].join('; ')

const cspHashOf = (text: string) => {
  const hash = createHash('sha256')
  hash.update(text)
  return `'sha256-${hash.digest('base64')}'`
}

export default class _Document extends Document {
  static getInitialProps = getInitialProps

  render() {
    let csp =
      process.env.NODE_ENV === 'production'
        ? cspRules(cspHashOf(NextScript.getInlineScriptSource(this.props)))
        : cspRules(
            "'unsafe-eval' " +
              cspHashOf(NextScript.getInlineScriptSource(this.props))
          )

    return (
      <Html>
        <Head>
          <meta httpEquiv="Content-Security-Policy" content={csp} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
