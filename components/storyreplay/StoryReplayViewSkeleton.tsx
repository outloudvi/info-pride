import { Alert, Skeleton } from '@mantine/core'
import { useQuery } from 'react-query'
import { useTranslations } from 'next-intl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

import StoryReplayView from './StoryReplayView'
import type { AdvFromAsset } from './types'

import Paths from '#utils/paths'

const StoryReplayViewSkeleton = ({
    id,
    index,
}: {
    id: string
    index: number
}) => {
    const $t = useTranslations('storyreplay')

    const { data: StoryLines } = useQuery<AdvFromAsset>({
        queryKey: id,
        queryFn: ({ queryKey: [path] }) =>
            fetch(Paths.advJson(path as string)).then((x) =>
                x.status === 200 ? x.json() : undefined
            ),
    })

    return StoryLines ? (
        <StoryReplayView
            lines={StoryLines.l.filter((x) => x._t !== 'Unknown')}
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
