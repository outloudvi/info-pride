import { AppProps } from 'next/app'
import Head from 'next/head'
import {
    ColorScheme,
    ColorSchemeProvider,
    Global,
    MantineProvider,
} from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { NextIntlProvider } from 'next-intl'
import '../styles/globals.css' // for Tailwind CSS
import { useColorScheme, useLocalStorage } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import NextNProgress from 'nextjs-progressbar'
import { atom, useAtom } from 'jotai'
import { QueryClient, QueryClientProvider } from 'react-query'

import Layout from '#components/layout/Layout'
import Loading from '#components/layout/Loading'
import startupHook from '#utils/startupHook'
import Paths from '#utils/paths'

const finishedAtom = atom(false)

const App = (props: AppProps) => {
    const { Component, pageProps } = props

    const preferredColorScheme = useColorScheme()
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: 'mantine-color-scheme',
        defaultValue: preferredColorScheme,
        getInitialValueInEffect: true,
    })
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

    const [finished, setFinished] = useAtom(finishedAtom)

    useEffect(() => {
        startupHook()
        setTimeout(() => setFinished(true), 500)
    }, [setFinished])

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
                <style
                    dangerouslySetInnerHTML={{
                        __html: `#ip_loading { background-color: #fff } @media (prefers-color-scheme: dark) { #ip_loading { background-color: #1A1B1E } }`,
                    }}
                ></style>
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
                            sm: 640,
                            md: 768,
                            lg: 1024,
                            xl: 1280,
                        },
                        colorScheme,
                        fontFamily:
                            '-apple-system, system-ui, "Segoe UI", "Helvetica Neue", Arial, "Hiragino Sans GB", "PingFang SC", "Heiti SC", "Noto Sans CJK SC", "Source Han Sans SC", "Microsoft YaHei UI", "Microsoft YaHei", sans-serif',
                    }}
                    styles={{
                        ActionIcon: (theme, params) => {
                            const color = params.color ?? theme.primaryColor
                            return {
                                root: {
                                    '&:not(:disabled):active': {
                                        transform: 'none',
                                    },
                                },
                                default: {
                                    '&:not(:disabled):active': {
                                        backgroundColor: theme.colors[color][8],
                                    },
                                },
                            }
                        },
                        Button: (theme, params) => {
                            const color = params.color ?? theme.primaryColor
                            return {
                                root: {
                                    '&:not(:disabled):active': {
                                        transform: 'none',
                                    },
                                },
                                outline: {
                                    '&:not(:disabled):active': {
                                        backgroundColor: theme.colors[color][2],
                                    },
                                },
                                filled: {
                                    '&:not(:disabled):hover': {
                                        backgroundColor: theme.colors[color][4],
                                    },
                                    '&:not(:disabled):active': {
                                        backgroundColor: theme.colors[color][8],
                                    },
                                },
                            }
                        },
                    }}
                >
                    <NotificationsProvider>
                        <QueryClientProvider client={queryClient}>
                            <Layout>
                                <Loading finished={finished} />
                                <NextNProgress />
                                <NextIntlProvider
                                    locale="zh-Hans"
                                    messages={pageProps._m}
                                >
                                    <Component {...pageProps} />
                                </NextIntlProvider>
                            </Layout>
                        </QueryClientProvider>
                    </NotificationsProvider>
                </MantineProvider>
            </ColorSchemeProvider>
        </>
    )
}

export default App
