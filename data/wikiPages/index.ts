import _cards from './cards.json' assert { type: 'json' }
import _idols from './idols.json' assert { type: 'json' }
import _songs from './songs.json' assert { type: 'json' }
import _wikiPagesMeta from './meta.json' assert { type: 'json' }
import type { TheRootSchema as WikiCards } from './cards'
import type { TheRootSchema as WikiIdols } from './idols'
import type { TheRootSchema as WikiSongs } from './songs'

export const Cards = _cards as WikiCards
export const Idols = _idols as WikiIdols
export const Songs = _songs as WikiSongs
export const Meta = _wikiPagesMeta
