import { useTranslations } from 'next-intl'
import _range from 'lodash/range'
import { Button } from '@mantine/core'

import { SeriesName } from '#data/stories'

const SeasonChapterList = ({
    series,
    season,
    length,
    selected,
    completion,
    onClick,
}: {
    series: SeriesName
    season: number
    length: number
    selected: number | null
    completion: Record<number, 0 | 1>
    onClick: (c: number) => void
}) => {
    const $t = useTranslations('stories')

    return (
        <div>
            <p>
                {$t(`series.${series}`)}{' '}
                {$t('season', {
                    s: season,
                })}
            </p>
            {_range(1, length + 1).map((chapter) => {
                const currentSelection = chapter === selected
                return (
                    <Button
                        variant="subtle"
                        compact
                        color={completion[chapter - 1] ? 'blue' : 'teal'}
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
