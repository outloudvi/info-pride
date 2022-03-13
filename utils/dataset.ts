import _notemap from './wikiModules/notemap.json'
import _diary from './wikiModules/diary.json'
import _calendar from './wikiModules/calendar.json'
import type { WikiNoteMap, WikiDiary, WikiCalendar } from './wikiModules/types'

export const notemap = _notemap.tb as WikiNoteMap
export const diary = _diary.tb as WikiDiary
export const calendar = _calendar.tb as WikiCalendar
