import _notemap from './dataset/notemap.json'
import _diary from './dataset/diary.json'
import _calendar from './dataset/calendar.json'
import type { WikiNoteMap, WikiDiary, WikiCalendar } from './dataset/types'

export const notemap = _notemap.tb as WikiNoteMap
export const diary = _diary.tb as WikiDiary
export const calendar = _calendar.tb as WikiCalendar
