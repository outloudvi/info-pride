import { AppProps } from 'next/app'
import Head from 'next/head'
import {
  ColorScheme,
  ColorSchemeProvider,
  Global,
  MantineProvider,
} from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { appWithTranslation } from 'next-i18next'
import '../styles/globals.css' // for Tailwind CSS
import { SWRConfig } from 'swr'
import { ResourceMapping } from '@outloudvi/hoshimi-types'
import { useColorScheme, useLocalStorage } from '@mantine/hooks'

import { fetchDb } from '../utils/api'

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
            <SWRConfig
              value={{
                fetcher: (url: keyof ResourceMapping) => {
                  // @ts-ignore: For now all params are in URL and sent over query params
                  return fetchDb(url)({})
                },
                provider: () => {
                  if (typeof localStorage === 'undefined') {
                    return new Map()
                  }
                  const cacheName = 'idoly-cache-v1'
                  const map = new Map(
                    JSON.parse(localStorage.getItem(cacheName) || '[]')
                  )
                  window.addEventListener('beforeunload', () => {
                    const appCache = JSON.stringify(Array.from(map.entries()))
                    localStorage.setItem(cacheName, appCache)
                  })

                  return map
                },
              }}
            >
              <Component {...pageProps} />
            </SWRConfig>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  )
}

export default appWithTranslation(App)
