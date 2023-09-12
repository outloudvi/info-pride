import { Progress } from '@mantine/core'
import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'

import type { IndexEventItem } from './types'

import { COMMON_DATE_FORMAT, SOURCE_TIMEZONE } from '#utils/constants'

const RoutineCountdown = ({
    title,
    event,
    bgColor,
    league,
}: {
    title: string
    event: IndexEventItem
    bgColor: string
    league?: boolean
}) => {
    const $t = useTranslations('index')
    const now = useMemo(() => Number(new Date()), [])

    if ('nextStart' in event) {
        return (
            <div className="border-solid border-gray-400 p-2 rounded flex-1">
                <b>{$t(title)}</b>
                <br />
                {$t('Inactive yet')}
                <br />
                {$t('Next event starts at:')}{' '}
                {dayjs(event.nextStart)
                    .tz(SOURCE_TIMEZONE)
                    .format(COMMON_DATE_FORMAT)}
            </div>
        )
    }

    const { start, end } = event

    return (
        <div className={`border-solid border-[${bgColor}] p-2 rounded flex-1`}>
            <b>{$t(title)}</b>
            <br />
            <Progress
                className="mb-1"
                value={((now - start) / (end - start)) * 100}
                aria-label={'progress'}
            />
            {$t('Ends at:')}{' '}
            {dayjs(event.end).tz(SOURCE_TIMEZONE).format(COMMON_DATE_FORMAT)}
        </div>
    )
}

export default RoutineCountdown
