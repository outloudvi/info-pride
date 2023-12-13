import React from 'react'
import { MantineProvider, ColorSchemeScript } from '@mantine/core'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { Notifications } from '@mantine/notifications'
import type { Metadata } from 'next'
import { pick } from 'lodash'
import { getMessages, unstable_setRequestLocale } from 'next-intl/server'

import locales from '../../locales/locales.json'

import { theme } from '#components/theme'
import Layout from '#components/layout/Layout'

import '../../styles/globals.css'

const DESCRIPTION = 'Informational site for Project IDOLY PRIDE fans.'
const BASE_TITLE = 'Info Pride'
const META_TITLE = `${BASE_TITLE} - ${DESCRIPTION}`
const META_DESCRIPTION = 'The IDOLY PRIDE game database.'
const BASEURL = 'https://ip.outv.im'
const OG_IMAGE = BASEURL + '/social.png'

export const metadata: Metadata = {
    metadataBase: new URL(BASEURL),
    title: {
        template: `%s | ${BASE_TITLE.toUpperCase()}`,
        default: BASE_TITLE.toUpperCase(),
    },
    description: META_DESCRIPTION,
    openGraph: {
        type: 'website',
        siteName: META_TITLE,
        description: META_DESCRIPTION,
        url: BASEURL,
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
    icons: {
        apple: [
            {
                url: '/apple-touch-icon.png?v=2',
                sizes: '180x180',
            },
        ],
        icon: [
            {
                url: '/favicon-16x16.png?v=2',
                sizes: '16x16',
            },
            {
                url: '/favicon-32x32.png?v=2',
                sizes: '32x32',
            },
        ],
    },
    manifest: '/site.webmanifest?v=2',
}

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }))
}

export default async function RootLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode
    params: { locale: string }
}) {
    if (!locales.includes(locale)) notFound()
    unstable_setRequestLocale(locale)
    const commonMessages = pick(await getMessages(), ['common'])

    return (
        <html lang={locale}>
            <head>
                <ColorSchemeScript />
                <link rel="shortcut icon" href="/favicon.svg" />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </head>
            <body>
                <MantineProvider theme={theme}>
                    <Notifications />
                    <NextIntlClientProvider messages={commonMessages}>
                        <Layout>{children}</Layout>
                    </NextIntlClientProvider>
                </MantineProvider>
            </body>
        </html>
    )
}
