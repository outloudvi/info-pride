import _calendar from './calendar.json' assert { type: 'json' }
import _wikiModulesMeta from './meta.json' assert { type: 'json' }
import type { TheTable as WikiCalendar } from './calendar'

export const Calendar = _calendar.tb as WikiCalendar
export const Meta = _wikiModulesMeta
