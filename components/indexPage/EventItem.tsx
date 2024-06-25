import { useMemo } from 'react'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Group, ActionIcon, Progress, Tooltip } from '@mantine/core'
import { useTranslations } from 'next-intl'
import dayjs from 'dayjs'
import dayjsUtc from 'dayjs/plugin/utc'
import dayjsTz from 'dayjs/plugin/timezone'

import type { EventItem } from './types'
import { EventType } from './types'

import Paths from '#utils/paths'
import {
    COMMON_DATE_FORMAT,
    ExtendedDateFormat,
    SOURCE_TIMEZONE,
} from '#utils/constants'

dayjs.extend(dayjsUtc)
dayjs.extend(dayjsTz)

const EventItemBlock = ({ item }: { item: EventItem }) => {
    const $t = useTranslations('index')

    const { title, type, start, end, link } = item

    const startDate = dayjs(start).tz(SOURCE_TIMEZONE)
    const endDate = dayjs(end).tz(SOURCE_TIMEZONE)
    const now = dayjs()
    const startDateStr = startDate.format(COMMON_DATE_FORMAT)
    const endDateStr = useMemo(() => {
        const startOfEndDate = endDate.startOf('day')
        if (endDate.diff(startOfEndDate, 'second') === 0) {
            return endDate.subtract(1, 'day').format(COMMON_DATE_FORMAT)
        }
        return endDate.format(COMMON_DATE_FORMAT)
    }, [endDate])

    const localTimeString = `${$t('local_time')} ${startDate
        .local()
        .format(ExtendedDateFormat)} - ${endDate
        .local()
        .format(ExtendedDateFormat)}`

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
                        {$t(EventType[type])} /{' '}
                        <Tooltip label={localTimeString}>
                            <span>
                                {startDateStr} - {endDateStr} (JST)
                            </span>
                        </Tooltip>
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

export default EventItemBlock
