import Link from 'next/link'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

import CurrentEvents from '../components/CurrentEvents'
import Notice from '../components/Notice'
import Layout from '../components/Layout'
import Paths from '../utils/paths'

const MainPageSiteData = [
  { 官方网站: 'https://idolypride.jp' },
  { 情报站微博: 'https://weibo.com/7326542616/' },
  {
    '攻略 wiki (BWiki)': 'https://wiki.biligame.com/idolypride/',
    '攻略 wiki (AppMedia)': 'https://appmedia.jp/idolypride',
  },
  {
    'Telegram 群组': 'https://t.me/hayasaka_mei',
    'QQ 群组': Paths.wiki('更多群组'),
  },
]

const Pages = {
  剧情: '/stories',
  谱面: '/notemap',
  卡片: '/cards',
  卡片搜索: '/search',
  麻奈日记: '/diary',
  系列颜色: '/colors',
}

const Home = () => {
  return (
    <Layout>
      <Grid container spacing={2} className="mt-3">
        <Grid item xs={12} lg={6}>
          <Typography textAlign="center" variant="h2">
            INFO PRIDE
          </Typography>
          <Stack
            spacing={2}
            direction="column"
            justifyContent="center"
            paddingTop="2rem"
          >
            {MainPageSiteData.map((items, _key) => (
              <Stack key={_key} direction="row">
                {Object.entries(items).map(([title, link], key) => (
                  <Button
                    key={key}
                    variant="outlined"
                    component="a"
                    href={link}
                    target="_blank"
                    rel="noopener"
                    className="basis-0 grow mx-2"
                  >
                    {title}
                  </Button>
                ))}
              </Stack>
            ))}
          </Stack>
        </Grid>
        <Grid item xs={12} lg={6}>
          <CurrentEvents />
        </Grid>
        {/* Line 2 */}
        <Grid item xs={12} lg={6}>
          <Typography variant="h4" className="mb-2">
            新闻
          </Typography>
          <Notice />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant="h4" className="mb-2">
            功能
          </Typography>
          {Object.entries(Pages).map(([name, link], key) => (
            <Link key={key} href={link} passHref>
              <Button variant="contained" className="mr-2">
                {name}
              </Button>
            </Link>
          ))}
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Home
