import type { Line, Title } from '@hoshimei/adv/types'
import { useTranslations } from 'next-intl'

import CompBackgroundSetting from './lines/BackgroundSetting'
import CompSe from './lines/Se'
import CompBgm from './lines/Bgm'
import CompMessage from './lines/Message'
import CompVoice from './lines/Voice'

function displayLine(line: Line): JSX.Element {
    switch (line._t) {
        case 'BackgroundSetting':
            return <CompBackgroundSetting l={line} />
        case 'Message':
            return <CompMessage l={line} />
        case 'Bgm':
            return <CompBgm l={line} />
        case 'Se':
            return <CompSe l={line} />
        case 'Voice':
            return <CompVoice l={line} />
        default:
            return <>{line._t}</>
    }
}

const StoryReplayView = ({ lines }: { lines: Line[] }) => {
    const $t = useTranslations('storyreplay')

    const title =
        (lines.find((x) => x._t === 'Title') as Title | undefined)?.title ??
        $t('no_title')

    return (
        <div>
            <h3>{title}</h3>
            {lines
                .filter(
                    (x) =>
                        ![
                            'BackgroundGroup',
                            'Title',
                            // TODO: Support BGM/SE/Voice
                            'Bgm',
                            'Se',
                            'Voice',
                        ].includes(x._t)
                )
                .map((line, key) => (
                    <div
                        key={key}
                        className="my-1 p-2 text-white bg-[#4c4c4c] rounded"
                    >
                        {displayLine(line)}
                    </div>
                ))}
        </div>
    )
}

export default StoryReplayView
