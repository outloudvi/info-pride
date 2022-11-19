import { execSync } from 'node:child_process'

import { Badge, Button, Grid, Group, Stack } from '@mantine/core'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import CurrentEvents from '#components/indexPage/CurrentEvents'
import Notice from '#components/indexPage/Notice'
import VersionInfo from '#components/indexPage/VersionInfo'
import Paths from '#utils/paths'
import NoticeTop from '#components/indexPage/NoticeTop'
import { addI18nMessages } from '#utils/getI18nProps'

const Home = ({ gitCommit }: { gitCommit: string }) => {
    const $t = useTranslations('index')

    const MainPageSiteData = [
        {
            [$t('Official website')]: 'https://idolypride.jp',
            [$t('Official Twitter')]: 'https://twitter.com/idolypride',
        },
        {
            // For l10n: these websites/accounts are in Chinese
            // A fan-run information publishing account
            [$t('情报站微博')]: 'https://weibo.com/7326542616/',
            // A group publishing podcasts by Chinese i-pri gamers
            [$t('星见编辑部')]: 'https://space.bilibili.com/1637756387',
        },
        {
            [$t('Game wiki (Bilibili)')]:
                'https://wiki.biligame.com/idolypride/',
            [$t('Game wiki (AppMedia)')]: 'https://appmedia.jp/idolypride',
        },
        {
            [$t('Telegram Group')]: 'https://t.me/hayasaka_mei',
            [$t('QQ Group')]: Paths.wiki('更多群组'),
        },
        {
            [$t('Discord Group (English)')]: 'https://discord.gg/XPXBvxGS96',
            [$t('Discord Group (Chinese)')]:
                'https://discord.com/invite/66j2jQJSc2',
        },
    ]

    return (
        <>
            <NoticeTop />
            <Grid className="mt-3">
                <Grid.Col xs={12} lg={6}>
                    <div className="text-center text-6xl mt-4">
                        INFO PRIDE <br />
                        <Link
                            href={`https://github.com/outloudvi/info-pride/tree/${gitCommit}`}
                            passHref
                        >
                            <Badge className="lowercase cursor-pointer align-super">
                                {gitCommit.slice(0, 8)}
                            </Badge>
                        </Link>
                    </div>
                    <Stack spacing={15} justify="center" className="mt-2">
                        {MainPageSiteData.map((items, _key) => (
                            <Group key={_key}>
                                {Object.entries(items).map(
                                    ([title, link], key) => (
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
                                    )
                                )}
                            </Group>
                        ))}
                    </Stack>
                </Grid.Col>
                <Grid.Col xs={12} lg={6}>
                    <CurrentEvents />
                </Grid.Col>
                {/* Line 2 */}
                <Grid.Col xs={12} lg={6}>
                    <div className="mb-2 text-3xl">{$t('News')}</div>
                    <Notice />
                </Grid.Col>
                <Grid.Col xs={12} lg={6}>
                    <div className="mb-2 text-3xl">{$t('Data revision')}</div>
                    <VersionInfo />
                </Grid.Col>
            </Grid>
        </>
    )
}

export async function getStaticProps({ locale }: { locale: string }) {
    const gitCommit = execSync('git rev-parse HEAD').toString().trim()
    return {
        props: {
            gitCommit,
            ...(await addI18nMessages(locale, ['index', 'notice'])),
        },
    }
}

export default Home
