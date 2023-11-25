import type { AppContext, AppProps } from 'next/app'
import App from 'next/app'
import Head from 'next/head'
import type { MantineColorScheme } from '@mantine/core'
import { MantineProvider } from '@mantine/core'
import { NextIntlClientProvider } from 'next-intl'
import '../styles/globals.css' // for Tailwind CSS
import { useState } from 'react'
import NextNProgress from 'nextjs-progressbar'
import { QueryClient, QueryClientProvider } from 'react-query'
import { getCookie } from 'cookies-next'
import { Notifications } from '@mantine/notifications'
import { useRouter } from 'next/router'

import Layout from '#components/layout/Layout'
import Paths from '#utils/paths'
import { theme } from '#components/theme'

import '@mantine/core/styles.css'
import './global.css'

const MainApp = (
    props: AppProps<{ _m: Record<string, string> }> & {
        colorScheme: MantineColorScheme
    },
) => {
    const { Component, pageProps } = props

    const router = useRouter()

    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: Infinity,
                        queryFn: ({ queryKey: [path] }) => {
                            if (typeof path === 'string') {
                                const url = new URL(Paths.api(path))
                                return fetch(String(url)).then((x) => x.json())
                            }
                            throw new Error('Invalid QueryKey')
                        },
                    },
                },
            }),
    )

    return (
        <>
            <Head>
                <title>INFO PRIDE</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>

            <MantineProvider theme={theme}>
                <Notifications />
                <QueryClientProvider client={queryClient}>
                    <NextIntlClientProvider
                        locale={router.locale}
                        timeZone="Asia/Tokyo"
                        messages={pageProps._m}
                    >
                        <Layout>
                            <NextNProgress />
                            <Component {...pageProps} />
                        </Layout>
                    </NextIntlClientProvider>
                </QueryClientProvider>
            </MantineProvider>
        </>
    )
}

MainApp.getInitialProps = async (appContext: AppContext) => {
    const { ctx } = appContext
    return {
        colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
        ...(await App.getInitialProps(appContext)),
    }
}

export default MainApp
