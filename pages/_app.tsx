import type { AppContext, AppProps } from 'next/app'
import App from 'next/app'
import Head from 'next/head'
import type { ColorScheme } from '@mantine/core'
import { ColorSchemeProvider, Global, MantineProvider } from '@mantine/core'
import { NextIntlProvider } from 'next-intl'
import '../styles/globals.css' // for Tailwind CSS
import { useEffect, useState } from 'react'
import NextNProgress from 'nextjs-progressbar'
import { QueryClient, QueryClientProvider } from 'react-query'
import { getCookie, setCookie } from 'cookies-next'
import { Notifications } from '@mantine/notifications'

import Layout from '#components/layout/Layout'
import startupHook from '#utils/startupHook'
import Paths from '#utils/paths'

const MainApp = (
    props: AppProps<{ _m: Record<string, string> }> & {
        colorScheme: ColorScheme
    }
) => {
    const { Component, pageProps } = props

    const [colorScheme, setColorScheme] = useState<ColorScheme>(
        props.colorScheme
    )

    const toggleColorScheme = (value?: ColorScheme) => {
        const nextColorScheme =
            value || (colorScheme === 'dark' ? 'light' : 'dark')
        setColorScheme(nextColorScheme)
        setCookie('mantine-color-scheme', nextColorScheme, {
            maxAge: 60 * 60 * 24 * 30,
        })
    }

    useEffect(() => {
        startupHook()
    }, [])

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
            })
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
            <ColorSchemeProvider
                colorScheme={colorScheme}
                toggleColorScheme={toggleColorScheme}
            >
                <Global
                    styles={(theme) => ({
                        a: {
                            color:
                                colorScheme === 'light'
                                    ? theme.colors.blue[7]
                                    : theme.colors.blue[3],
                        },
                    })}
                />
                <MantineProvider
                    withGlobalStyles
                    withNormalizeCSS
                    theme={{
                        breakpoints: {
                            sm: '40em',
                            md: '48em',
                            lg: '64em',
                            xl: '80em',
                        },
                        colorScheme,
                        fontFamily:
                            '-apple-system, system-ui, "Segoe UI", "Helvetica Neue", Arial, "Hiragino Sans GB", "PingFang SC", "Heiti SC", "Noto Sans CJK SC", "Source Han Sans SC", "Microsoft YaHei UI", "Microsoft YaHei", sans-serif',
                        components: {
                            ActionIcon: {
                                styles: (theme) => {
                                    {
                                        return {
                                            root: {
                                                '&:not(:disabled):active': {
                                                    transform: 'none',
                                                },
                                            },
                                            default: {
                                                '&:not(:disabled):active': {
                                                    backgroundColor:
                                                        theme.colors[
                                                            theme.primaryColor
                                                        ][8],
                                                },
                                            },
                                        }
                                    }
                                },
                            },
                            Button: {
                                styles: (theme) => {
                                    const color = theme.primaryColor
                                    return {
                                        root: {
                                            '&:not(:disabled):active': {
                                                transform: 'none',
                                            },
                                        },
                                        outline: {
                                            '&:not(:disabled):active': {
                                                backgroundColor:
                                                    theme.colors[color][2],
                                            },
                                        },
                                        filled: {
                                            '&:not(:disabled):hover': {
                                                backgroundColor:
                                                    theme.colors[color][4],
                                            },
                                            '&:not(:disabled):active': {
                                                backgroundColor:
                                                    theme.colors[color][8],
                                            },
                                        },
                                    }
                                },
                            },
                        },
                    }}
                >
                    <Notifications />
                    <QueryClientProvider client={queryClient}>
                        <NextIntlProvider
                            messages={pageProps._m}
                            getMessageFallback={({ key }) => key}
                        >
                            <Layout>
                                <NextNProgress />
                                <Component {...pageProps} />
                            </Layout>
                        </NextIntlProvider>
                    </QueryClientProvider>
                </MantineProvider>
            </ColorSchemeProvider>
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
