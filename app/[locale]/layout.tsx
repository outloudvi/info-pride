import React, { Suspense } from 'react'
import { MantineProvider, ColorSchemeScript } from '@mantine/core'
import { NextIntlClientProvider } from 'next-intl'
import { Notifications } from '@mantine/notifications'
import type { Metadata } from 'next'
import { pick } from 'lodash'
import { getMessages, unstable_setRequestLocale } from 'next-intl/server'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { config as faConfig } from '@fortawesome/fontawesome-svg-core'
import Script from 'next/script'

import Layout from '#components/layout/Layout'
import locales from '#locales/locales.json'
import { theme } from '#components/theme'
import Paths from '#utils/paths'
import pickFontSetForLocale from '#utils/pickFontSetForLocale'

import '../../styles/globals.css'

// https://fontawesome.com/docs/web/use-with/react/use-with#next-js
faConfig.autoAddCss = false

const DESCRIPTION = 'Informational site for Project IDOLY PRIDE fans.'
const BASE_TITLE = 'Info Pride'
const META_TITLE = `${BASE_TITLE} - ${DESCRIPTION}`
const META_DESCRIPTION = 'The IDOLY PRIDE (アイプラ) game database.'
const OG_IMAGE = Paths.self('/social.png')

export const metadata: Metadata = {
    metadataBase:
        process.env.NODE_ENV === 'production'
            ? new URL(Paths.self(''))
            : new URL(`http://localhost:${process.env.PORT ?? 3000}`),
    title: {
        template: `%s | ${BASE_TITLE.toUpperCase()}`,
        default: BASE_TITLE.toUpperCase(),
    },
    description: META_DESCRIPTION,
    alternates: {
        canonical: './',
    },
    openGraph: {
        type: 'website',
        siteName: META_TITLE,
        description: META_DESCRIPTION,
        url: './',
        images: {
            alt: META_DESCRIPTION,
            url: OG_IMAGE,
            width: 1200,
            height: 600,
        },
    },
    twitter: {
        card: 'summary_large_image',
        description: META_DESCRIPTION,
        images: OG_IMAGE,
    },
    manifest: '/site.webmanifest?v=2',
}

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }))
}

const trackingSrc = `
var _paq = window._paq = window._paq || [];
  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="//tomo.outv.im/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '1']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
  })();`.trim()

export default async function RootLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode
    params: { locale: string }
}) {
    unstable_setRequestLocale(locale)
    const commonMessages = pick(await getMessages(), ['common'])

    return (
        <html lang={locale}>
            <head>
                <ColorSchemeScript />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
                <Script>{trackingSrc}</Script>
                <style
                    dangerouslySetInnerHTML={{
                        __html: `:root{--loc-fonts:${pickFontSetForLocale(locale, true)}}:lang(ja){font-family:${pickFontSetForLocale('ja', false)}`,
                    }}
                ></style>
            </head>
            <body>
                <Suspense fallback={null}>
                    <MantineProvider theme={theme}>
                        <Notifications />
                        {/* note: it's just for the common layout; see withMessages for NextIntlClientProvider for the actual contents */}
                        <NextIntlClientProvider messages={commonMessages}>
                            <Layout>{children}</Layout>
                        </NextIntlClientProvider>
                    </MantineProvider>
                    <SpeedInsights />
                </Suspense>
            </body>
        </html>
    )
}
