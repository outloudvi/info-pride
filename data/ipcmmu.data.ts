import { CharacterId } from './vendor/characterId'

import Paths from '#utils/paths'

export const IdolyFashionUrl: Partial<Record<CharacterId, string>> = {
    'char-skr': Paths.ipcommu('fashion-02'),
    'char-rei': Paths.ipcommu('fashion-03'),
    'char-hrk': Paths.ipcommu('fashion-05'),
    'char-chs': Paths.ipcommu('fashion-07'),
    'char-szk': Paths.ipcommu('fashion-10'),
    'char-ktn': Paths.ipcommu('fashion-01'),
    'char-ngs': Paths.ipcommu('fashion-04'),
    'char-ski': Paths.ipcommu('fashion-06'),
    'char-suz': Paths.ipcommu('fashion-08'),
    'char-mei': Paths.ipcommu('fashion-09'),
    'char-rui': Paths.ipcommu('fashion-11'),
    'char-yu': Paths.ipcommu('fashion-12'),
    'char-smr': Paths.ipcommu('fashion-13'),
    'char-rio': Paths.ipcommu('fashion-14'),
    'char-aoi': Paths.ipcommu('fashion-15'),
    'char-ai': Paths.ipcommu('fashion-16'),
    'char-kkr': Paths.ipcommu('fashion-17'),
    'char-mna': Paths.ipcommu('fashion-18'),
} as const

export const IdolyRoomUrl: Partial<Record<CharacterId, string>> = {
    'char-ktn': Paths.ipcommu('room-01'),
    'char-skr': Paths.ipcommu('room-02'),
} as const
