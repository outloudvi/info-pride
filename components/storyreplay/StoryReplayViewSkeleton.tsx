import { Alert, Skeleton } from '@mantine/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { getTranslations } from 'next-intl/server'

import StoryReplayView from './StoryReplayView'
import type { AdvFromAsset } from './types'

import Paths from '#utils/paths'

const StoryReplayViewSkeleton = async ({
    id,
    index,
    storyId,
}: {
    id: string
    index: number
    storyId: string
}) => {
    const $t = await getTranslations('storyreplay')

    const StoryLines: AdvFromAsset = await fetch(Paths.advJson(id)).then((x) =>
        x.json(),
    )

    return StoryLines ? (
        <StoryReplayView
            lines={StoryLines.l.filter((x) => x._t !== 'Unknown')}
            storyId={storyId}
        />
    ) : (
        <>
            {index === 0 && (
                <Alert
                    icon={<FontAwesomeIcon icon={faInfoCircle} />}
                    color="orange"
                    className="mb-2"
                >
                    {$t('be_patient')}
                </Alert>
            )}
            <Skeleton height={300} />
        </>
    )
}

export default StoryReplayViewSkeleton
