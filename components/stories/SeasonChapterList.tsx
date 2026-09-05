import { useTranslations } from 'next-intl'
import { Button } from '@mantine/core'

import type { SeriesName } from '#data/stories'
import parseEpisodes from '#utils/parseEpisodes'

const SeasonChapterList = ({
    series,
    season,
    notation,
    selected,
    completion,
    onClick,
}: {
    series: SeriesName
    season: number
    notation: string
    selected: number | null
    completion: Record<number, 0 | 1>
    onClick: (c: number) => void
}) => {
    const $t = useTranslations('stories')
    const episodes = parseEpisodes(notation)

    return (
        <div className="overflow-y-scroll">
            <p>
                {$t(`series.${series}`)}{' '}
                {$t('season', {
                    s: season,
                })}
            </p>
            {episodes.map((chapter) => {
                const currentSelection = chapter === selected
                return (
                    <Button
                        variant="subtle"
                        size="compact-sm"
                        color={completion[chapter] ? 'blue' : 'teal'}
                        key={chapter}
                        onClick={() => {
                            onClick(chapter)
                        }}
                        disabled={currentSelection}
                    >
                        {season}-{chapter}
                    </Button>
                )
            })}
        </div>
    )
}

export default SeasonChapterList
