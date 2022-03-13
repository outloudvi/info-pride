import Box from '@mui/material/Box'
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
        <footer>
          <Box
            sx={{
              textAlign: 'center',
              color: '#666',
            }}
          >
            <a
              href="https://github.com/outloudvi/info-pride"
              target="_blank"
              rel="noopener"
            >
              源代码
            </a>
            <br />
            来自{' '}
            <a
              href="https://wiki.biligame.com/idolypride/%E9%A6%96%E9%A1%B5"
              target="_blank"
              rel="noopener"
            >
              bwiki
            </a>{' '}
            的内容以{' '}
            <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/deed.zh">
              CC BY-NC-SA 3.0
            </a>{' '}
            协议授权
            <br />
            来自游戏的内容 &copy; QualiArts 及相关实体
          </Box>
        </footer>
      </body>
    </Html>
  )
}
