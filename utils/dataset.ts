// wikiModules
import _notemap from './wikiModules/notemap.json' assert { type: 'json' }
import _diary from './wikiModules/diary.json' assert { type: 'json' }
import _calendar from './wikiModules/calendar.json' assert { type: 'json' }
import _wikiModulesMeta from './wikiModules/meta.json' assert { type: 'json' }
import type { TheTable as WikiDiary } from './wikiModules/diary'
import type { TheTable as WikiNoteMap } from './wikiModules/notemap'
import type { TheTable as WikiCalendar } from './wikiModules/calendar'

export const Notemap = _notemap.tb as WikiNoteMap
export const Diary = _diary.tb as WikiDiary
export const Calendar = _calendar.tb as WikiCalendar
export const WikiModulesMeta = _wikiModulesMeta

// wikiPages
import _cards from './wikiPages/cards.json' assert { type: 'json' }
import _idols from './wikiPages/idols.json' assert { type: 'json' }
import _songs from './wikiPages/songs.json' assert { type: 'json' }
import _wikiPagesMeta from './wikiModules/meta.json' assert { type: 'json' }
import _cardSkillsData from './wikiPages/cardSkills.json' assert { type: 'json' }
import type { TheRootSchema as WikiCards } from './wikiPages/cards'
import type { TheRootSchema as WikiIdols } from './wikiPages/idols'
import type { TheRootSchema as WikiSongs } from './wikiPages/songs'

import type { IdolName } from '../data/idols'
import type { Ident } from './wikiPages/types'

export const Cards = _cards as WikiCards
export const Idols = _idols as WikiIdols
export const Songs = _songs as WikiSongs
export const WikiPagesMeta = _wikiPagesMeta
export const CardSkillsData = _cardSkillsData as Record<
  IdolName,
  Record<string, Record<'ski1' | 'ski2' | 'ski3', Ident[]>>
>

// vendor
import _storiesTitle from './vendor/storiesTitle.json' assert { type: 'json' }
import type { TheRootSchema as VendorStoriesTitle } from './vendor/storiesTitle'

export const StoriesTitle = _storiesTitle as VendorStoriesTitle
