import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import CurrentEvents from '../components/CurrentEvents'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Link from 'next/link'
import Layout from '../components/Layout'

const MainPageSiteData = {
  官方网站: 'https://idolypride.jp',
  '攻略 wiki (BWiki)': 'https://wiki.biligame.com/idolypride/',
  '攻略 wiki (AppMedia)': 'https://appmedia.jp/idolypride',
  情报站微博: 'https://weibo.com/7326542616/',
  'Telegram 讨论群组': 'https://t.me/hayasaka_mei',
}

const Pages = {
  剧情: '/stories',
  谱面: '/notemap',
  卡片: '/cards',
}

const Home = () => {
  return (
    <Layout>
      <Grid container spacing={2} className="mt-3">
        <Grid item xs={12} lg={4}>
          <Typography textAlign="center" variant="h2">
            INFO PRIDE
          </Typography>
          <Stack
            spacing={2}
            direction="column"
            justifyContent="center"
            paddingTop="2rem"
          >
            {Object.entries(MainPageSiteData).map(([title, link], key) => (
              <Button
                key={key}
                variant="outlined"
                component="a"
                href={link}
                target="_blank"
                rel="noopener"
              >
                {title}
              </Button>
            ))}
          </Stack>
        </Grid>
        <Grid item xs={12} lg={8}>
          <CurrentEvents />
        </Grid>
        {/* Line 2 */}
        <Grid item xs={12}>
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
