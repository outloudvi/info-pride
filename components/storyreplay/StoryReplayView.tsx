import type { BackgroundGroup, Line, Title } from '@hoshimei/adv/types'
import { useTranslations } from 'next-intl'
import { useMemo, Fragment } from 'react'

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

export function displayLine(
    line: MergedLine,
    backgroundGroup: Record<string, string>
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
            return <CompXBranch l={line} backgroundGroup={backgroundGroup} />
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

const StoryReplayView = ({ lines }: { lines: Line[] }) => {
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
                    (x) => !['BackgroundGroup', 'Title'].includes(x._t)
                ),
                title
            ),
        [lines, title]
    )

    return (
        <div>
            <h3>{title}</h3>
            {mergedLines.map((line, key) => (
                <Fragment key={key}>
                    {displayLine(line, backgroundGroup)}
                </Fragment>
            ))}
        </div>
    )
}

export default StoryReplayView
