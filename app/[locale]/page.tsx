import { Button, Flex, Grid, GridCol, SimpleGrid } from '@mantine/core'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import Link from 'next/link'

import CurrentEvents from '#components/indexPage/CurrentEvents'
import Notice from '#components/indexPage/Notice'
import VersionInfo from '#components/indexPage/VersionInfo'
import Paths from '#utils/paths'
import NoticeTop from '#components/indexPage/NoticeTop'
import IndexTitle from '#components/indexPage/IndexTitle'
import RoutineCountdown from '#components/indexPage/RoutineCountdown'
import { withMessages } from '#utils/withMessages'
import CurrentGachas from '#components/indexPage/CurrentGachas'

const MainPageSiteData = {
    ['Official website']: 'https://idolypride.jp',
    ['Official Twitter']: 'https://twitter.com/idolypride',

    // A group publishing podcasts by Chinese i-pri gamers
    ['星见编辑部']: 'https://space.bilibili.com/1637756387',
    ['Game wiki (Bilibili)']: 'https://wiki.biligame.com/idolypride/',

    ['Telegram Group']: 'https://t.me/hayasaka_mei',
    ['QQ Group']: Paths.wiki('相关群组'),

    ['Unofficial Discord Group (English)']: 'https://discord.gg/XPXBvxGS96',
    ['Unofficial Discord Group (Chinese)']: 'https://discord.gg/idolypride',
}

const Home = async ({ params }: { params: Promise<{ locale: string }> }) => {
    const { locale } = await params
    unstable_setRequestLocale(locale)
    const $t = await getTranslations({ locale, namespace: 'index' })

    return (
        <>
            <NoticeTop />
            <Flex direction={{ base: 'column', md: 'row' }} gap="sm">
                <IndexTitle />
                <RoutineCountdown
                    title={'VenusLeague'}
                    eventType="VenusLeague"
                    bgColor={'#a5adff'}
                />
                <RoutineCountdown
                    title={'VenusBattle'}
                    eventType="VenusBattle"
                    bgColor={'#d894fc'}
                />
                <RoutineCountdown
                    title={'UnionBattle'}
                    eventType="UnionBattle"
                    bgColor={'#81c275'}
                />
            </Flex>
            <Grid className="mt-3">
                <GridCol span={12}>
                    <CurrentGachas />
                </GridCol>
                <GridCol span={{ base: 12, lg: 6 }}>
                    <SimpleGrid cols={2}>
                        {Object.entries(MainPageSiteData).map(
                            ([title, link], _key) => (
                                <Link
                                    key={_key}
                                    href={link}
                                    target="_blank"
                                    rel="noopener"
                                    className="no-underline"
                                >
                                    <Button
                                        variant="outline"
                                        className="basis-0 grow mx-2"
                                        fullWidth
                                        classNames={{
                                            label: 'whitespace-normal',
                                        }}
                                    >
                                        {$t(title)}
                                    </Button>
                                </Link>
                            ),
                        )}
                    </SimpleGrid>
                </GridCol>
                <GridCol span={{ base: 12, lg: 6 }}>
                    <CurrentEvents />
                </GridCol>
                {/* Line 2 */}
                <GridCol span={{ base: 12, lg: 6 }}>
                    <div className="mb-2 text-3xl">{$t('News')}</div>
                    <Notice />
                </GridCol>
                <GridCol span={{ base: 12, lg: 6 }}>
                    <div className="mb-2 text-3xl">{$t('Data revision')}</div>
                    <VersionInfo />
                </GridCol>
            </Grid>
        </>
    )
}

export default withMessages(Home, ['index', 'notice'])
