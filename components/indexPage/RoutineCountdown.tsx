'use client'

import { Progress } from '@mantine/core'
import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import dayjsUtc from 'dayjs/plugin/utc'
import dayjsTz from 'dayjs/plugin/timezone'

import {
    getStartOfToday,
    getUnionBattleEvent,
    getVenusBattleEvent,
    getVenusLeagueEvent,
} from './venusEvents'

import { COMMON_DATE_FORMAT, SOURCE_TIMEZONE } from '#utils/constants'

dayjs.extend(dayjsUtc)
dayjs.extend(dayjsTz)

type RoutineEvent = 'VenusLeague' | 'VenusBattle' | 'UnionBattle'

const RoutineCountdown = ({
    title,
    eventType,
    bgColor,
}: {
    title: string
    eventType: RoutineEvent
    bgColor: string
}) => {
    const $t = useTranslations('index')
    const [now, setNow] = useState<number | null>(null)
    const startOfToday = getStartOfToday()
    const event = {
        VenusLeague: getVenusLeagueEvent,
        VenusBattle: getVenusBattleEvent,
        UnionBattle: getUnionBattleEvent,
    }[eventType](startOfToday)

    useEffect(() => {
        setNow(Date.now())
        const interval = window.setInterval(() => setNow(Date.now()), 60_000)
        return () => window.clearInterval(interval)
    }, [])

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
                value={now === null ? 0 : ((now - start) / (end - start)) * 100}
                aria-label={'progress'}
            />
            {$t('Ends at:')}{' '}
            {dayjs(event.end).tz(SOURCE_TIMEZONE).format(COMMON_DATE_FORMAT)}
        </div>
    )
}

export default RoutineCountdown
