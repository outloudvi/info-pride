import { Button, Grid, Group, Stack } from '@mantine/core'

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

const Home = () => {
  return (
    <Layout>
      <Grid className="mt-3">
        <Grid.Col xs={12} lg={6}>
          <div className="text-center text-6xl mt-4">INFO PRIDE</div>
          <Stack spacing={15} justify="center" className="mt-2">
            {MainPageSiteData.map((items, _key) => (
              <Group key={_key}>
                {Object.entries(items).map(([title, link], key) => (
                  <Button
                    key={key}
                    variant="outline"
                    component="a"
                    href={link}
                    target="_blank"
                    rel="noopener"
                    className="basis-0 grow mx-2"
                  >
                    {title}
                  </Button>
                ))}
              </Group>
            ))}
          </Stack>
        </Grid.Col>
        <Grid.Col xs={12} lg={6}>
          <CurrentEvents />
        </Grid.Col>
        {/* Line 2 */}
        <Grid.Col xs={12} lg={6}>
          <div className="mb-2 text-3xl">新闻</div>
          <Notice />
        </Grid.Col>
      </Grid>
    </Layout>
  )
}

export default Home
