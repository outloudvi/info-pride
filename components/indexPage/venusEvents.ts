import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import dayjsUtc from 'dayjs/plugin/utc'
import dayjsTz from 'dayjs/plugin/timezone'

import type { IndexEventItem } from '#components/indexPage/types'
import { SOURCE_TIMEZONE } from '#utils/constants'

dayjs.extend(dayjsUtc)
dayjs.extend(dayjsTz)

const LastVenusBattleStartDate = '2022-12-02'

export function getStartOfToday(): Dayjs {
    return dayjs().tz(SOURCE_TIMEZONE).startOf('day')
}

export function getVenusBattleEvent(startOfToday: Dayjs): IndexEventItem {
    // VB goes for 9 days and rests for a day
    const baseDate = dayjs.tz(LastVenusBattleStartDate)
    const dayProgressForCurrVenus = startOfToday.diff(baseDate, 'day') % 10

    if (dayProgressForCurrVenus === 9) {
        // in rest
        return {
            nextStart: Number(startOfToday.add(1, 'day')),
        }
    }
    const startDate = startOfToday.subtract(dayProgressForCurrVenus, 'day')
    const endDate = startDate.add(9, 'day').subtract(1, 'second')

    return {
        start: Number(startDate),
        end: Number(endDate),
    }
}

export function getUnionBattleEvent(startOfToday: Dayjs): IndexEventItem {
    // UB starts at 15th and goes for 7 days
    const day = startOfToday.date()
    if (day >= 15 && day <= 21) {
        const startDate = startOfToday.date(15)
        const endDate = startOfToday.date(22)
        return {
            start: Number(startDate),
            end: Number(endDate),
        }
    }
    return {
        nextStart: Number(
            day > 21
                ? startOfToday.add(11, 'day').date(15)
                : startOfToday.date(15)
        ),
    }
}

export function getVenusLeagueEvent(startOfToday: Dayjs): IndexEventItem {
    // VL starts at every Mon till Sun
    const startDate = startOfToday.day(1)
    const endDate = startOfToday.day(0).add(1, 'week')
    return {
        start: Number(startDate),
        end: Number(endDate),
    }
}
