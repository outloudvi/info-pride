import { useMemo } from 'react'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Group, ActionIcon, Progress } from '@mantine/core'
import { useTranslations } from 'next-intl'
import dayjs from 'dayjs'
import dayjsUtc from 'dayjs/plugin/utc'
import dayjsTz from 'dayjs/plugin/timezone'

import { EventItem, EventType } from './types'

import Paths from '#utils/paths'

dayjs.extend(dayjsUtc)
dayjs.extend(dayjsTz)

const EventItem = ({ item }: { item: EventItem }) => {
    const $t = useTranslations('index')

    const { title, type, start, end, link } = item

    const now = dayjs()
    const startDateStr = dayjs(start).tz('Asia/Tokyo').format('YYYY/M/D')
    const endDateStr = useMemo(() => {
        const endDate = dayjs(end).tz('Asia/Tokyo')
        const startOfEndDate = endDate.startOf('day')
        if (endDate.diff(startOfEndDate, 'second') === 0) {
            return endDate.subtract(1, 'day').format('YYYY/M/D')
        }
        return endDate.format('YYYY/M/D')
    }, [end])

    return (
        <div className="mb-4">
            <Group align="center" className="mb-1">
                {link && (
                    <a
                        title={$t('Event info (Chinese)')}
                        href={Paths.wiki(link)}
                    >
                        <ActionIcon
                            color="blue"
                            size="xl"
                            variant="outline"
                            aria-label="View wiki"
                        >
                            <FontAwesomeIcon icon={faInfoCircle} />
                        </ActionIcon>
                    </a>
                )}
                <div>
                    <span>{title}</span> <br />
                    <span className="text-sm text-gray-500">
                        {$t(EventType[type])} / {startDateStr} - {endDateStr}
                    </span>
                </div>
            </Group>
            <Progress
                value={100 * ((Number(now) - start) / (end - start))}
                aria-label={title}
            />
        </div>
    )
}

export default EventItem
