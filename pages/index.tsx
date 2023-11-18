import { Button, Flex, Grid, Group, Stack } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import dynamic from 'next/dynamic'

import CurrentEvents from '#components/indexPage/CurrentEvents'
import Notice from '#components/indexPage/Notice'
import VersionInfo from '#components/indexPage/VersionInfo'
import Paths from '#utils/paths'
import NoticeTop from '#components/indexPage/NoticeTop'
import getI18nProps from '#utils/getI18nProps'
import IndexTitle from '#components/indexPage/IndexTitle'
import {
    getStartOfToday,
    getUnionBattleEvent,
    getVenusBattleEvent,
    getVenusLeagueEvent,
} from '#components/indexPage/venusEvents'

const RoutineCountdown = dynamic(
    () => import('#components/indexPage/RoutineCountdown'),
    { ssr: false },
)

const MainPageSiteData = [
    {
        ['Official website']: 'https://idolypride.jp',
        ['Official Twitter']: 'https://twitter.com/idolypride',
    },
    {
        // For l10n: these websites/accounts are in Chinese
        // A fan-run information publishing account
        ['情报站微博']: 'https://weibo.com/7326542616/',
        // A group publishing podcasts by Chinese i-pri gamers
        ['星见编辑部']: 'https://space.bilibili.com/1637756387',
    },
    {
        ['Game wiki (Bilibili)']: 'https://wiki.biligame.com/idolypride/',
        ['Game wiki (AppMedia)']: 'https://appmedia.jp/idolypride',
    },
    {
        ['Telegram Group']: 'https://t.me/hayasaka_mei',
        ['QQ Group']: Paths.wiki('更多群组'),
    },
    {
        ['Discord Group (English)']: 'https://discord.gg/XPXBvxGS96',
        ['Discord Group (Chinese)']: 'https://discord.com/invite/66j2jQJSc2',
    },
]

const Home = () => {
    const $t = useTranslations('index')

    const startOfToday = useMemo(() => getStartOfToday(), [])

    return (
        <>
            <NoticeTop />
            <Flex direction={{ base: 'column', md: 'row' }} gap="sm">
                <IndexTitle />
                <RoutineCountdown
                    title={'VenusLeague'}
                    event={getVenusLeagueEvent(startOfToday)}
                    bgColor={'#a5adff'}
                    league={true}
                />
                <RoutineCountdown
                    title={'VenusBattle'}
                    event={getVenusBattleEvent(startOfToday)}
                    bgColor={'#d894fc'}
                />
                <RoutineCountdown
                    title={'UnionBattle'}
                    event={getUnionBattleEvent(startOfToday)}
                    bgColor={'#81c275'}
                />
            </Flex>
            <Grid className="mt-3">
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Stack gap={15} justify="center" className="mt-2">
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
                                            {$t(title)}
                                        </Button>
                                    ),
                                )}
                            </Group>
                        ))}
                    </Stack>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <CurrentEvents />
                </Grid.Col>
                {/* Line 2 */}
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <div className="mb-2 text-3xl">{$t('News')}</div>
                    <Notice />
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <div className="mb-2 text-3xl">{$t('Data revision')}</div>
                    <VersionInfo />
                </Grid.Col>
            </Grid>
        </>
    )
}

export const getStaticProps = getI18nProps(['index', 'notice'])

export default Home
