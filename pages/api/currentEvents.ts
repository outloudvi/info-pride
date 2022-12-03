import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import dayjsUtc from 'dayjs/plugin/utc'
import dayjsTz from 'dayjs/plugin/timezone'
import dayjsIsSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import dayjsIsSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import dayjsCustomParseFormat from 'dayjs/plugin/customParseFormat'

import type { EventType as CalendarEventType } from '#data/wikiModules/calendar'
import type { EventItem } from '#components/indexPage/types'
import { EventType } from '#components/indexPage/types'

dayjs.extend(dayjsUtc)
dayjs.extend(dayjsTz)
dayjs.extend(dayjsIsSameOrAfter)
dayjs.extend(dayjsIsSameOrBefore)
dayjs.extend(dayjsCustomParseFormat)

const CalendarEventTypeMapping: Record<CalendarEventType, EventType> = {
    // Don't translate this as they are from biliwiki
    通常卡池: EventType.NormalGacha,
    限定卡池: EventType.LimitedGacha,
    复刻卡池: EventType.PickupGacha,
    定例活动: EventType.NormalTour,
    links活动: EventType.LinksTour,
    VENUS对战: EventType.VenusBattle,
    VENUS赛事活动: EventType.VenusTournament,
    联合对战: EventType.UnionBattle,
    摄影活动: EventType.Shooting,
    愚人节: EventType.AprilFools,
    私信任务活动: EventType.MessageEvent,
    合宿活动: EventType.Training,
    'multi links活动': EventType.MultiLinks,
}

const CommonDateFormat = 'YYYY/M/D'
const LastVenusBattleStartDate = '2022/12/2'

function getVenusBattleEvent(startOfToday: Dayjs): EventItem[] {
    // VB goes for 9 days and rests for a day
    const baseDate = dayjs(LastVenusBattleStartDate, CommonDateFormat)
    const dayProgressForCurrVenus = startOfToday.diff(baseDate, 'day') % 10
    if (dayProgressForCurrVenus === 9) {
        // in rest
        return []
    }
    const startDate = startOfToday.subtract(dayProgressForCurrVenus, 'day')
    const endDate = startDate.add(9, 'day')
    return [
        {
            title: 'VENUS バトル',
            type: EventType.VenusBattle,
            start: Number(startDate),
            end: Number(endDate),
        },
    ]
}

function getUnionBattleEvent(startOfToday: Dayjs): EventItem[] {
    // UB starts at 15th and goes for 7 days
    const day = startOfToday.date()
    if (day >= 15 && day <= 21) {
        const startDate = startOfToday.date(15)
        const endDate = startOfToday.date(22)
        return [
            {
                title: 'VENUS ユニオン',
                type: EventType.UnionBattle,
                start: Number(startDate),
                end: Number(endDate),
            },
        ]
    }
    return []
}

import type { FrontendAPIResponseMapping } from '#utils/useFrontendApi'
import { Calendar } from '#data/wikiModules'

const currentEvents = async (
    _: NextApiRequest,
    res: NextApiResponse<FrontendAPIResponseMapping['currentEvents']>
) => {
    const startOfToday = dayjs().tz('Asia/Tokyo').startOf('day')
    const allEvents = Object.values(Calendar).reduce((a, b) => [...a, ...b])
    const activeEvents = allEvents
        .filter(
            (x) =>
                startOfToday.isSameOrAfter(x.start, 'day') &&
                startOfToday.isSameOrBefore(x.end, 'day')
        )
        .sort(
            (a, b) =>
                Number(dayjs(a.start, CommonDateFormat)) -
                Number(dayjs(b.start, CommonDateFormat))
        )
        .map(({ title, type, start, end, link }) => ({
            title,
            type: CalendarEventTypeMapping[type],
            start: Number(dayjs(start, CommonDateFormat)),
            end: Number(dayjs(end, CommonDateFormat)),
            link: link ? link : undefined,
        }))

    res.status(200).json([
        ...activeEvents,
        ...getVenusBattleEvent(startOfToday),
        ...getUnionBattleEvent(startOfToday),
    ])
}

export default withSentry(currentEvents)

export const config = {
    api: {
        externalResolver: true,
    },
}
