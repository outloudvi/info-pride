// wikiModules
import _notemap from './wikiModules/notemap.json'
import _diary from './wikiModules/diary.json'
import _calendar from './wikiModules/calendar.json'
import type { TheTable as WikiDiary } from './wikiModules/diary'
import type { TheTable as WikiNoteMap } from './wikiModules/notemap'
import type { TheTable as WikiCalendar } from './wikiModules/calendar'

export const notemap = _notemap.tb as WikiNoteMap
export const diary = _diary.tb as WikiDiary
export const calendar = _calendar.tb as WikiCalendar

// wikiPages
import _cards from './wikiPages/cards.json'
import _idols from './wikiPages/idols.json'
import type { TheRootSchema as WikiCards } from './wikiPages/cards'
import type { TheRootSchema as WikiIdols } from './wikiPages/idols'

export const cards = _cards as WikiCards
export const idols = _idols as WikiIdols
