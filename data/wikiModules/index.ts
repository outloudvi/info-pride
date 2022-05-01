import _diary from './diary.json' assert { type: 'json' }
import _calendar from './calendar.json' assert { type: 'json' }
import _wikiModulesMeta from './meta.json' assert { type: 'json' }
import type { TheTable as WikiDiary } from './diary'
import type { TheTable as WikiCalendar } from './calendar'

export const Diary = _diary.tb as WikiDiary
export const Calendar = _calendar.tb as WikiCalendar
export const Meta = _wikiModulesMeta
