// https://community.idolypride.jp/

import { CharacterId } from './characterId'

export const SizeStyle = {
  xs: {
    width: 96,
    height: 126,
  },
  sm: {
    width: 192,
    height: 252,
  },
}

export function getMoveStyle(ch: CharacterId): [number, number] {
  switch (ch) {
    case 'char-ktn':
    case 'char-ski':
    case 'char-mei':
    case 'char-suz':
    case 'char-chs':
    case 'char-rei':
    case 'char-ai':
    case 'char-kkr':
    case 'char-mna':
    case 'char-hrk':
      return [2.07, 30]
    case 'char-skr':
      return [2, 29]
    case 'char-szk':
      return [2.6, 38]
    case 'char-ngs':
      return [2.53, 37]
    case 'char-rui':
      return [2.13, 31]
    case 'char-yu':
    case 'char-rio':
      return [2.4, 35]
    case 'char-smr':
      return [1.8, 26]
    case 'char-aoi':
      return [2.73, 40]
    case 'char-kor':
    case 'char-kan':
    case 'char-mhk':
      return [0, 0]
  }
}
