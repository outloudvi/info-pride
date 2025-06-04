import type { CharacterId } from './vendor/characterId'

import Paths from '#utils/paths'

export const IdolyFashionUrl: Partial<Record<CharacterId, string>> = {
    'char-skr': Paths.ipweb('fashion-02'),
    'char-rei': Paths.ipweb('fashion-03'),
    'char-hrk': Paths.ipweb('fashion-05'),
    'char-chs': Paths.ipweb('fashion-07'),
    'char-szk': Paths.ipweb('fashion-10'),
    'char-ktn': Paths.ipweb('fashion-01'),
    'char-ngs': Paths.ipweb('fashion-04'),
    'char-ski': Paths.ipweb('fashion-06'),
    'char-suz': Paths.ipweb('fashion-08'),
    'char-mei': Paths.ipweb('fashion-09'),
    'char-rui': Paths.ipweb('fashion-11'),
    'char-yu': Paths.ipweb('fashion-12'),
    'char-smr': Paths.ipweb('fashion-13'),
    'char-rio': Paths.ipweb('fashion-14'),
    'char-aoi': Paths.ipweb('fashion-15'),
    'char-ai': Paths.ipweb('fashion-16'),
    'char-kkr': Paths.ipweb('fashion-17'),
    'char-mna': Paths.ipweb('fashion-18'),
} as const

export const IdolyRoomUrl: Partial<Record<CharacterId, string>> = {
    'char-ktn': Paths.ipweb('room-01'),
    'char-skr': Paths.ipweb('room-02'),
} as const
