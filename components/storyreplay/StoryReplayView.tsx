'use client'

import type { BackgroundGroup, Line, Title } from '@hoshimei/adv/types'
import { useTranslations } from 'next-intl'
import { useMemo, useState } from 'react'
import { Button } from '@mantine/core'

import CompBackgroundSetting from './lines/BackgroundSetting'
import CompSe from './lines/Se'
import CompBgm from './lines/Bgm'
import CompMessage from './lines/Message'
import CompVoice from './lines/Voice'
import CompNarration from './lines/Narration'
import collapseLines from './collapseLines'
import type { MergedLine } from './types'
import CompMWV from './lines/MWV'
import CompXBranch from './lines/XBranch'
import Box from './Box'
import ErrorBoundary from '#utils/errorBoundary'
import StoryContext, { StoryStateStorageContext } from './StoryContext'
import runLogics from './logicParser'
import { STORY_STORAGE_PREFIX, getBaseId, getPartId } from './utils'

import { Link } from '#utils/navigation'
import logics from '#data/moshikoi' // TODO: import on-demand
import tryJSONParse from '#utils/tryJsonParse'
import { MoshikoiConfig } from '#data/moshikoi/types'
import KoiPartsList from './KoiPartsList'

export function displayLine(
    line: MergedLine,
    backgroundGroup: Record<string, string>,
    index: string,
): JSX.Element {
    switch (line._t) {
        case 'BackgroundSetting': {
            const id = backgroundGroup[line.id]
            return (
                <Box>
                    {id ? (
                        <CompBackgroundSetting id={id} />
                    ) : (
                        <div>Unknown Image</div>
                    )}
                </Box>
            )
        }

        case 'Bgm':
            return (
                <Box>
                    <CompBgm l={line} />
                </Box>
            )
        case 'Se':
            return (
                <Box>
                    <CompSe l={line} />
                </Box>
            )
        case 'Narration':
            return (
                <Box>
                    <CompNarration l={line} />
                </Box>
            )
        case 'MWV':
            return (
                <Box>
                    <CompMWV l={line} />
                </Box>
            )
        case 'XBranch':
            return (
                <CompXBranch
                    l={line}
                    index={index}
                    backgroundGroup={backgroundGroup}
                />
            )
        // Fallback
        case 'Message':
            return (
                <Box>
                    <CompMessage l={line} />
                </Box>
            )
        case 'Voice':
            return (
                <Box>
                    <CompVoice l={line} />
                </Box>
            )
        default:
            return <Box>{line._t}</Box>
    }
}

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
                {mergedLines.map((line, key) => (
                    <ErrorBoundary key={key}>
                        {displayLine(line, backgroundGroup, String(key))}
                    </ErrorBoundary>
                ))}
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
