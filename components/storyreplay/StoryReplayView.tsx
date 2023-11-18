import type { BackgroundGroup, Line, Title } from '@hoshimei/adv/types'
import { useTranslations } from 'next-intl'
import { useMemo, Fragment, useState } from 'react'
import { Button } from '@mantine/core'
import Link from 'next/link'

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
import StoryContext, { StoryStateStorageContext } from './StoryContext'
import evaluateLogic from './logicParser'
import logics from '#data/moshikoi' // TODO: import on-demand
import { STORY_STORAGE_PREFIX, getBaseId, getPartId } from './utils'

import tryJSONParse from '#utils/tryJsonParse'

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
                    <CompBackgroundSetting id={id} />
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
}: {
    lines: Line[]
    storyId: string
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
            // @ts-expect-error Normal tests
            logics?.[baseId]?.[partId] &&
            evaluateLogic(
                // @ts-expect-error Normal tests
                logics?.[baseId]?.[partId],
                koiState,
            ),
        [koiState, baseId, partId],
    )

    const storyContext = useMemo(
        () => new StoryStateStorageContext(storyId, setKoiState),
        [storyId],
    )

    return (
        <div>
            <StoryContext.Provider value={storyContext}>
                <h3>{title}</h3>
                {mergedLines.map((line, key) => (
                    <Fragment key={key}>
                        {displayLine(line, backgroundGroup, String(key))}
                    </Fragment>
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
