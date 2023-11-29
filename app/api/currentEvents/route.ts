import dayjs from 'dayjs'
import dayjsUtc from 'dayjs/plugin/utc'
import dayjsTz from 'dayjs/plugin/timezone'
import dayjsIsSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import dayjsIsSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import dayjsCustomParseFormat from 'dayjs/plugin/customParseFormat'

import type { EventType as CalendarEventType } from '#data/wikiModules/calendar'
import { EventType } from '#components/indexPage/types'
import { Calendar } from '#data/wikiModules'
import { getStartOfToday } from '#components/indexPage/venusEvents'
import { COMMON_DATE_FORMAT, SOURCE_TIMEZONE } from '#utils/constants'

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
    VENUS联赛: EventType.VenusLeague,
}

export async function GET() {
    const startOfToday = getStartOfToday()
    const allEvents = Object.values(Calendar).reduce((a, b) => [...a, ...b])
    const activeEvents = allEvents
        .filter(
            (x) =>
                startOfToday.isSameOrAfter(x.start, 'day') &&
                startOfToday.isSameOrBefore(x.end, 'day') &&
                !['VENUS对战', '联合对战', 'VENUS联赛'].includes(x.type),
        )
        .sort(
            (a, b) =>
                // TZ doesn't matter here since they are all dates without time
                Number(dayjs.tz(a.start, COMMON_DATE_FORMAT, SOURCE_TIMEZONE)) -
                Number(dayjs.tz(b.start, COMMON_DATE_FORMAT, SOURCE_TIMEZONE)),
        )
        .map(({ title, type, start, end, link }) => ({
            title,
            type: CalendarEventTypeMapping[type],
            start: Number(dayjs.tz(start, COMMON_DATE_FORMAT, SOURCE_TIMEZONE)),
            end: Number(dayjs.tz(end, COMMON_DATE_FORMAT, SOURCE_TIMEZONE)),
            link: link ? link : undefined,
        }))

    return Response.json(activeEvents)
}
