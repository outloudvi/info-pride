import { Diary } from '#data/wikiModules'

export const toShortDate = (date: Date) =>
    `${String(date.getFullYear()).slice(2)}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`

export const fromShortDate = (s: string | null) =>
    s === null ? new Date(0) : new Date('20' + s)

export const getDiaryRangePair = () => {
    const dates = Diary.map((x) => x.date).sort()
    return {
        first: dates[0],
        last: dates[dates.length - 1],
    }
}
