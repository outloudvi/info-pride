import { Alert, Skeleton } from '@mantine/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { getTranslations } from 'next-intl/server'
import dynamic from 'next/dynamic'
import * as Sentry from '@sentry/nextjs'

import type { AdvFromAsset } from './types'
import { getBaseId } from './utils'

import Paths from '#utils/paths'
import moshikoiLogics from '#data/moshikoi'

const StoryReplayView = dynamic(() => import('./StoryReplayView'), {
    ssr: false,
})

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

    const StoryLines: AdvFromAsset = await fetch(Paths.advJson(id))
        .then((x) => x.json())
        .catch((e) => String(e))

    if (typeof StoryLines === 'string') {
        Sentry.captureException(new Error(`Inexistent story adv: ${id}`))
        return <Alert color="red">{StoryLines}</Alert>
    }

    const baseId = getBaseId(storyId)
    const moshikoiData = moshikoiLogics[baseId]

    return StoryLines ? (
        <StoryReplayView
            lines={StoryLines.l.filter((x) => x._t !== 'Unknown')}
            storyId={storyId}
            {...(moshikoiData ? { koi: moshikoiData } : {})}
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
