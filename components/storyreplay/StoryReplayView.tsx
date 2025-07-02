'use client'

import type { BackgroundGroup, Line, Title } from '@hoshimei/adv/types'
import { useTranslations } from 'next-intl'
import { useMemo, useState } from 'react'
import { Button } from '@mantine/core'

import collapseLines from './collapseLines'
import StoryContext, { StoryStateStorageContext } from './StoryContext'
import runLogics from './logicParser'
import { STORY_STORAGE_PREFIX, getBaseId, getPartId } from './utils'

import { Link } from '#utils/navigation'
import tryJSONParse from '#utils/tryJsonParse'
import { MoshikoiConfig } from '#data/moshikoi/types'
import KoiPartsList from './KoiPartsList'
import StoryAutoplay from './StoryAutoplay'

const StoryReplayView = ({
    lines,
    storyId,
    koi,
}: {
    lines: Line[]
    storyId: string
    koi?: MoshikoiConfig
}) => {
    const $t = useTranslations('storyreplay')

    const title =
        (lines.find((x) => x._t === 'Title') as Title | undefined)?.title ??
        $t('no_title')

    const backgroundGroup: Record<string, string> =
        (
            lines.find((x) => x._t === 'BackgroundGroup') as
                | BackgroundGroup
                | undefined
        )?.backgrounds ?? {}

    const mergedLines = useMemo(
        () =>
            collapseLines(
                lines.filter(
                    (x) => !['BackgroundGroup', 'Title'].includes(x._t),
                ),
                title,
            ),
        [lines, title],
    )

    const baseId = getBaseId(storyId)
    const partId = getPartId(storyId)
    const [koiState, setKoiState] = useState<Record<string, number>>(
        (tryJSONParse(
            window?.localStorage?.getItem(STORY_STORAGE_PREFIX + baseId),
        ) ?? {}) as Record<string, number>,
    )
    const nextPart = useMemo(
        () =>
            koi?.gameLogic?.[partId] &&
            runLogics(koi?.gameLogic?.[partId], koiState),
        [koiState, baseId, partId],
    )

    const storyContext = useMemo(
        () => new StoryStateStorageContext(storyId, setKoiState),
        [storyId],
    )

    return (
        <div>
            <StoryContext.Provider value={storyContext}>
                {koi && (
                    <KoiPartsList
                        parts={koi.parts}
                        baseId={baseId}
                        currentPartId={partId}
                    />
                )}
                <h3>{title}</h3>
                <StoryAutoplay
                    lines={mergedLines}
                    backgroundGroup={backgroundGroup}
                />
                {nextPart === null ? (
                    <div className="text-center">{$t('(End)')}</div>
                ) : nextPart !== undefined ? (
                    <div className="text-center">
                        <Link href={`/story/${baseId}-${nextPart}`}>
                            <Button>{$t('Next chapter')}</Button>
                        </Link>
                    </div>
                ) : (
                    <></>
                )}
            </StoryContext.Provider>
        </div>
    )
}

export default StoryReplayView
