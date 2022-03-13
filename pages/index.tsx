import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import CurrentEvents from '../components/CurrentEvents'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Link from 'next/link'

const MainPageSiteData = {
  官方网站: 'https://idolypride.jp',
  '攻略 wiki': 'https://wiki.biligame.com/idolypride/',
  情报站微博: 'https://weibo.com/7326542616/',
  'Telegram 讨论群组': 'https://t.me/hayasaka_mei',
}

const Home = () => {
  return (
    <Container
      sx={{
        marginTop: '2rem',
      }}
    >
      <Grid container spacing={2}>
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
          <Link href="/stories" passHref>
            <Button variant="contained">剧情</Button>
          </Link>
          <Link href="/notemap" passHref>
            <Button variant="contained">谱面</Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home
