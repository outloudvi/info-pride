import { useMemo } from 'react'
import { Button, Grid, Tabs } from '@mantine/core'
import _range from 'lodash/range'
import { atomWithHash } from 'jotai/utils'
import { useAtom } from 'jotai'

import StoriesItem, {
    SpecialStoriesItem,
} from '#components/stories/StoriesItem'
import { Episodes, Series } from '#data/stories'
import StoriesData from '#data/stories.data'
import Title from '#components/Title'

const seriesAtom = atomWithHash('series', 0)
const seasonAtom = atomWithHash('season', 1)
const chapterAtom = atomWithHash('chapter', 1)

const StoriesPage = () => {
    const [series, setSeries] = useAtom(seriesAtom)
    const [season, setSeason] = useAtom(seasonAtom)
    const [chapter, setChapter] = useAtom(chapterAtom)
    const seriesName = Series[series]

    const completion = useMemo(() => {
        const ret: Record<string, Record<number, Record<number, boolean>>> = {}
        for (let i = 0; i < Series.length; i++) {
            const seriesSlug = Series[i]
            ret[seriesSlug] = Episodes[seriesSlug][1].map(
                (length, episodeKey) =>
                    _range(1, length + 1).map((chapterId) =>
                        Boolean(
                            StoriesData?.[seriesSlug]?.[episodeKey + 1]?.[
                                chapterId
                            ]
                        )
                    )
            )
        }
        return ret
    }, [])

    return (
        <>
            <Title title="剧情" />
            <Grid gutter={20} className="my-3">
                <Grid.Col xs={12} lg={6}>
                    <Tabs defaultValue="Hoshimi">
                        <Tabs.List>
                            {Series.filter((x) => x !== 'Special').map(
                                (seriesSlug, seriesKey) => (
                                    <Tabs.Tab
                                        value={seriesSlug}
                                        key={seriesKey}
                                    >
                                        {Episodes[seriesSlug][0]}
                                    </Tabs.Tab>
                                )
                            )}
                            <Tabs.Tab value="others">其它</Tabs.Tab>
                        </Tabs.List>
                        {Series.filter((x) => x !== 'Special').map(
                            (seriesSlug, seriesKey) => (
                                <Tabs.Panel value={seriesSlug} key={seriesKey}>
                                    <div className="max-h-[60vh] overflow-y-auto">
                                        {Episodes[seriesSlug][1].map(
                                            (
                                                episodeLengthInSeason,
                                                seasonKey
                                            ) => (
                                                <div key={seasonKey}>
                                                    <p>
                                                        {
                                                            Episodes[
                                                                seriesSlug
                                                            ][0]
                                                        }{' '}
                                                        第{seasonKey + 1}章
                                                    </p>
                                                    {_range(
                                                        1,
                                                        episodeLengthInSeason +
                                                            1
                                                    ).map(
                                                        (
                                                            chapterNum,
                                                            chapterKey
                                                        ) => {
                                                            const currentSelection =
                                                                series ===
                                                                    seriesKey &&
                                                                season ===
                                                                    seasonKey +
                                                                        1 &&
                                                                chapter ===
                                                                    chapterNum
                                                            return (
                                                                <Button
                                                                    variant="subtle"
                                                                    compact
                                                                    color={
                                                                        completion?.[
                                                                            seriesSlug
                                                                        ]?.[
                                                                            seasonKey
                                                                        ]?.[
                                                                            chapterKey
                                                                        ]
                                                                            ? 'blue'
                                                                            : 'teal'
                                                                    }
                                                                    key={
                                                                        chapterKey
                                                                    }
                                                                    onClick={() => {
                                                                        setSeries(
                                                                            seriesKey
                                                                        )
                                                                        setSeason(
                                                                            seasonKey +
                                                                                1
                                                                        )
                                                                        setChapter(
                                                                            chapterNum
                                                                        )
                                                                    }}
                                                                    disabled={
                                                                        currentSelection
                                                                    }
                                                                >
                                                                    {seasonKey +
                                                                        1}
                                                                    -
                                                                    {chapterNum}
                                                                </Button>
                                                            )
                                                        }
                                                    )}
                                                </div>
                                            )
                                        )}
                                    </div>
                                </Tabs.Panel>
                            )
                        )}
                        <Tabs.Panel value="others">
                            <div className="max-h-[60vh] overflow-y-auto">
                                {Object.entries(
                                    StoriesData.Special?.[1] ?? []
                                ).map(([chapterId, chapterItem], key) => {
                                    const seriesKey = Series.indexOf('Special')
                                    const chapterNum = Number(chapterId)
                                    const currentSelection =
                                        series === seriesKey &&
                                        season === 1 &&
                                        chapter === chapterNum
                                    return (
                                        <Button
                                            variant="subtle"
                                            compact
                                            key={key}
                                            onClick={() => {
                                                setSeries(seriesKey)
                                                setSeason(1)
                                                setChapter(Number(chapterId))
                                            }}
                                            disabled={currentSelection}
                                        >
                                            {chapterItem.name}
                                        </Button>
                                    )
                                })}
                            </div>
                        </Tabs.Panel>
                    </Tabs>
                </Grid.Col>
                <Grid.Col xs={12} lg={6}>
                    {seriesName === 'Special' ? (
                        <SpecialStoriesItem
                            series={seriesName}
                            season={season}
                            chapter={chapter}
                        />
                    ) : (
                        <StoriesItem
                            series={seriesName}
                            season={season}
                            chapter={chapter}
                        />
                    )}
                </Grid.Col>
            </Grid>
        </>
    )
}

export default StoriesPage
