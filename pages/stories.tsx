import { Button, Grid, Tabs } from '@mantine/core'
import _range from 'lodash/range'
import { useTranslations } from 'next-intl'
import { NumberParam, useQueryParams, withDefault } from 'use-query-params'

import StoriesItem from '#components/stories/StoriesItem'
import SpecialStoriesItem from '#components/stories/SpecialStoriesItem'
import { Episodes, Series, SeriesName } from '#data/stories'
import Title from '#components/Title'
import { addI18nMessages } from '#utils/getI18nProps'
import storiesData from '#data/videos/stories.data'
import { IStoriesData } from '#data/videos/stories.data/types'
import SeasonChapterList from '#components/stories/SeasonChapterList'
import getSpecialStories from '#components/stories/getSpecialStories'
import { ChapterItem } from '#data/types'
import withQueryParam from '#utils/withQueryParam'

const SPECIAL_SERIES_TAG = 99

const StoriesPage = ({
    completion,
    special,
}: {
    completion: IStoriesData<0 | 1>
    special: ChapterItem[]
}) => {
    const $t = useTranslations('stories')

    const [query, setQuery] = useQueryParams({
        series: withDefault(NumberParam, 0),
        s: withDefault(NumberParam, 1),
        c: withDefault(NumberParam, 1),
    })
    const { series: curSeries, s: curSeason, c: curChapter } = query

    const seriesName = Series[curSeries]

    return (
        <>
            <Title title={$t('Stories')} />
            <Grid gutter={20} className="my-3">
                <Grid.Col xs={12} lg={6}>
                    <Tabs defaultValue="Hoshimi">
                        <Tabs.List>
                            {Series.map((seriesSlug, seriesKey) => (
                                <Tabs.Tab value={seriesSlug} key={seriesKey}>
                                    {$t(`series.${seriesSlug}`)}
                                </Tabs.Tab>
                            ))}
                            <Tabs.Tab value="special">{$t('Others')}</Tabs.Tab>
                        </Tabs.List>
                        {Series.map((seriesSlug, seriesKey) => {
                            return (
                                <Tabs.Panel value={seriesSlug} key={seriesKey}>
                                    <div className="max-h-[60vh] overflow-y-auto">
                                        {Episodes[seriesSlug].map(
                                            (
                                                episodeLengthInSeason,
                                                seasonKey
                                            ) => {
                                                const season = seasonKey + 1
                                                return (
                                                    <SeasonChapterList
                                                        key={season}
                                                        series={seriesSlug}
                                                        season={season}
                                                        length={
                                                            episodeLengthInSeason
                                                        }
                                                        completion={
                                                            completion?.[
                                                                seriesSlug
                                                            ][season] ?? {}
                                                        }
                                                        selected={
                                                            curSeries ===
                                                                seriesKey &&
                                                            curSeason === season
                                                                ? curChapter
                                                                : null
                                                        }
                                                        onClick={(chapter) => {
                                                            setQuery({
                                                                series: seriesKey,
                                                                s: season,
                                                                c: chapter,
                                                            })
                                                        }}
                                                    />
                                                )
                                            }
                                        )}
                                    </div>
                                </Tabs.Panel>
                            )
                        })}
                        <Tabs.Panel value="special">
                            <div>
                                <p>{$t('Others')}</p>
                                {(special ?? []).map((item, key) => {
                                    return (
                                        <Button
                                            variant="subtle"
                                            compact
                                            color="blue"
                                            key={key}
                                            onClick={() => {
                                                setQuery({
                                                    series: SPECIAL_SERIES_TAG,
                                                    s: 1,
                                                    c: key,
                                                })
                                            }}
                                            disabled={
                                                curSeries ===
                                                    SPECIAL_SERIES_TAG &&
                                                curChapter === key
                                            }
                                        >
                                            {item.name}
                                        </Button>
                                    )
                                })}
                            </div>
                        </Tabs.Panel>
                    </Tabs>
                </Grid.Col>
                <Grid.Col xs={12} lg={6}>
                    {curSeries === SPECIAL_SERIES_TAG ? (
                        <SpecialStoriesItem item={special[curChapter]} />
                    ) : (
                        <StoriesItem
                            series={seriesName}
                            season={curSeason}
                            chapter={curChapter}
                        />
                    )}
                </Grid.Col>
            </Grid>
        </>
    )
}

export const getServerSideProps = async ({ locale }: { locale: string }) => {
    const completion = (() => {
        const ret: Partial<IStoriesData<0 | 1>> = {}
        for (let i = 0; i < Series.length; i++) {
            const seriesSlug = Series[i]
            ret[seriesSlug] = [
                // skip index 0
                [],
                ...Episodes[seriesSlug].map((length, episodeKey) =>
                    _range(1, length + 1).map((chapterId) =>
                        storiesData?.[locale]?.data?.[
                            seriesSlug as SeriesName
                        ]?.[episodeKey + 1]?.[chapterId]
                            ? 1
                            : 0
                    )
                ),
            ]
        }
        return ret
    })()

    return {
        props: {
            ...(await addI18nMessages(locale, ['stories'])),
            completion,
            special: getSpecialStories(locale),
        },
    }
}

export default withQueryParam(StoriesPage)
