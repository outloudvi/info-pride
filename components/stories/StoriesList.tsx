'use client'

import { Button, Tabs } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'

import { SPECIAL_SERIES_TAG } from './constants'
import type { SearchParams } from './sp'

import { Episodes, Series } from '#data/stories'
import SeasonChapterList from '#components/stories/SeasonChapterList'
import type { ChapterItem } from '#data/types'
import useSetSearchParams from '#utils/useSetSearchParams'
import type { IStoriesData } from '#data/videos/stories.data/types'

const StoriesList = ({
    special,
    completion,
}: {
    special: ChapterItem[]
    completion: IStoriesData<0 | 1>
}) => {
    const $t = useTranslations('stories')
    const { setSearchs } = useSetSearchParams<SearchParams>()
    const params = useSearchParams()

    const curSeries = params.get('series')
    const curSeason = params.get('s')
    const curChapter = params.get('c')

    return (
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
                                (episodeLengthInSeason, seasonKey) => {
                                    const season = seasonKey + 1
                                    return (
                                        <SeasonChapterList
                                            key={season}
                                            series={seriesSlug}
                                            season={season}
                                            length={episodeLengthInSeason}
                                            completion={
                                                completion?.[seriesSlug][
                                                    season
                                                ] ?? {}
                                            }
                                            selected={
                                                curSeries ===
                                                    String(seriesKey) &&
                                                curSeason === String(season)
                                                    ? Number(curChapter)
                                                    : null
                                            }
                                            onClick={(chapter) => {
                                                setSearchs([
                                                    [
                                                        'series',
                                                        String(seriesKey),
                                                    ],
                                                    ['s', String(season)],
                                                    ['c', String(chapter)],
                                                ])
                                            }}
                                        />
                                    )
                                },
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
                                size="compact-sm"
                                color="blue"
                                key={key}
                                onClick={() => {
                                    setSearchs([
                                        ['series', String(SPECIAL_SERIES_TAG)],
                                        ['s', '1'],
                                        ['c', String(key)],
                                    ])
                                }}
                                disabled={
                                    curSeries === String(SPECIAL_SERIES_TAG) &&
                                    curChapter === String(key)
                                }
                            >
                                {item.name}
                            </Button>
                        )
                    })}
                </div>
            </Tabs.Panel>
        </Tabs>
    )
}

export default StoriesList
