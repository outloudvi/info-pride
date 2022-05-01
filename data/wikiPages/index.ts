import { CharacterId } from '../vendor/characterId'

import _cards from './cards.json' assert { type: 'json' }
import _idols from './idols.json' assert { type: 'json' }
import _songs from './songs.json' assert { type: 'json' }
import _wikiPagesMeta from './meta.json' assert { type: 'json' }
import _cardSkillsData from './cardSkills.json' assert { type: 'json' }
import type { TheRootSchema as WikiCards } from './cards'
import type { TheRootSchema as WikiIdols } from './idols'
import type { TheRootSchema as WikiSongs } from './songs'
import type { Ident } from './types'

export const Cards = _cards as WikiCards
export const Idols = _idols as WikiIdols
export const Songs = _songs as WikiSongs
export const Meta = _wikiPagesMeta
export const CardSkillsData = _cardSkillsData as Record<
  CharacterId,
  Record<string, Record<'ski1' | 'ski2' | 'ski3', Ident[]>>
>
