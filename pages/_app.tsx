import { AppProps } from 'next/app'
import Head from 'next/head'
import { SWRConfig } from 'swr'
import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import type { ResourceMapping } from '@outloudvi/hoshimi-types'

import { fetchDb } from '../utils/api'

// for Tailwind CSS
import '../styles/globals.css'

export default function App(props: AppProps) {
  const { Component, pageProps } = props

  return (
    <>
      <Head>
        <title>INFO PRIDE</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
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
          <SWRConfig
            value={{
              fetcher: (url: keyof ResourceMapping) => {
                // @ts-ignore: For now all params are in URL and sent over query params
                return fetchDb(url)({})
              },
            }}
          >
            <Component {...pageProps} />
          </SWRConfig>
        </NotificationsProvider>
      </MantineProvider>
    </>
  )
}
