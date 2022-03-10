import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import lightTheme from '../styles/theme/lightTheme'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <Head>
        <title>INFO PRIDE</title>
      </Head>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
