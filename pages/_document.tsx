import { Html, Head, Main, NextScript } from 'next/document'
import AppBar from '../components/AppBar'

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <body>
        <AppBar />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
