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
    // Asset server
    'idoly-assets-curator.vercel.app',
    'res.cloudinary.com',
]

const META_TITLE = 'info pride'
const META_DESCRIPTION =
    'An informational website for Project IDOLY PRIDE fans.'
const BASEURL = 'https://ip.outv.im'

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
        const csp =
            process.env.NODE_ENV === 'production'
                ? cspRules(
                      cspHashOf(NextScript.getInlineScriptSource(this.props))
                  )
                : cspRules(
                      "'unsafe-eval' " +
                          cspHashOf(
                              NextScript.getInlineScriptSource(this.props)
                          )
                  )

        return (
            <Html>
                <Head>
                    <meta httpEquiv="Content-Security-Policy" content={csp} />
                    <meta property="og:title" content={META_TITLE} />
                    <meta property="twitter:title" content={META_TITLE} />
                    <meta property="og:url" content={BASEURL} />
                    <meta property="twitter:url" content={BASEURL} />
                    <meta name="description" content={META_DESCRIPTION} />
                    <meta
                        property="og:description"
                        content={META_DESCRIPTION}
                    />
                    <meta
                        property="twitter:description"
                        content={META_DESCRIPTION}
                    />
                    <meta
                        property="og:image"
                        content={BASEURL + '/social.png'}
                    />
                    <meta property="og:image:alt" content={META_DESCRIPTION} />
                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="600" />
                    <meta property="og:site_name" content={META_TITLE} />
                    <meta property="og:type" content="website" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
