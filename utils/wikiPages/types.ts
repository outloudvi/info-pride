type ComparerGt = {
  $gt: number
}

type ComparerLt = {
  $lt: number
}

type ComparerEq = {
  $eq: number
}

type Comparer = ComparerGt | ComparerLt | ComparerEq

// TODO
type TargetPerson = TargetPersonSimple | string

export enum TargetPersonSimple {
  Self = 'Self',
  Neighbour = 'Neighbour',
  Center = 'Center',
  Everyone = 'Everyone',
  Whoever = 'Whoever',
  HighestNOfProp = 'HighestNOfProp',
  SelectedN = 'SelectedN',
  ScorerN = 'ScorerN',
  LeastStaminaN = 'LeastStaminaN',
}

type Targeted = {
  on: TargetPerson
}

type TargetedRival = {
  on: 'sameTrack' | 'centerTrack'
}

type Status = StatusSimple

export enum StatusSimple {
  Invisible = 'Invisible',
  Focused = 'Focused',
  BadCond = 'BadCond',
  NegRecover = 'NegRecover',
  NoNeg = 'NoNegagive',
  EnhanceExtend = 'EnhanceExtEnhanceExtend',
  EnhanceStrengthen = 'EnhanceStrengthen',
  HighSpirits = 'HighSpirits',
  BeatScoring = 'BeatScoring',
  ScoringUp = 'ScoringUp',
  CritCoefUp = 'CritCoefUp',
  CritRateUp = 'CritRateUp',
  StamDraiUp = 'StamDraiUp',
  StamDraiDn = 'StamDraiDn',
  SkilSuccUp = 'SkilSuccUp',
  CombScorUp = 'CombScorUp',
  NoBreak = 'NoBreak',
  AScorUp = 'AScorUp',
  VocalUp = 'VocalUp',
  DanceUp = 'DanceUp',
  VisualUp = 'VisualUp',
  VocalDn = 'VocalDn',
  DanceDn = 'DanceDn',
  VisualDn = 'VisualDn',
}

export enum StatusLinkSimple {
  Critical = 'Critical',
  EnhancedStatus = 'EnhancedStatus',
  CostStamina = 'CostStamina',
  SkillExecCount = 'SkillExecCount',

  MostStamina = 'MostStamina',
  MostCoreFanRate = 'MostCoreFanRate',
  LeastStamina = 'LeastStamina',
  LeastAudCount = 'LeastAudCount',
}

type StatusLink = StatusSimple | StatusLinkSimple

type Property = PropertySimple

export enum PropertySimple {
  Stamina = 'Stamina',
}

type Event = EventCritical | EventCombo | string

type EventCritical = {
  type: 'critical'
}

type EventCombo = {
  type: 'combo'
  combo: Comparer
}

type TrackType = TrackTypeSimple | string

enum TrackTypeSimple {
  Vocal = 'Vocal',
  Dance = 'Dance',
  Visual = 'Visual',
}

type Action = 'SP' | 'A'

type CondEveryBeat = {
  every: 'beat'
}

type CondBefore = {
  before: Action
}

type CondOnStatus = {
  status: Status
} & Targeted

type CondOnProp = {
  prop: Property
  value: Comparer
} & Targeted

type CondOnEvent = {
  event: Event
} & Partial<Targeted>

type CondOnTrack = {
  trackType: TrackType
} & Targeted

type CondOnMode = {
  isBattle: true
}

type CondOnPosition = {
  position: 'center'
}

type Condition =
  | CondEveryBeat
  | CondBefore
  | CondOnStatus
  | CondOnProp
  | CondOnEvent
  | CondOnTrack
  | CondOnPosition
  | CondOnMode

type EffectScoreMultiplier = {
  type: 'scoreMultiplier'
  scoreMultiplyPerc: number
  probabilityPerc?: number
}

type EffectCtDecrsase = {
  type: 'ctDecrease'
  ctDecrease: number
} & Targeted

type EffectStamRecovery = {
  type: 'stamRecovery'
  stamRecovery: number
} & Targeted

type EffectGiveStatus = {
  type: 'giveStatus'
  giveStatus: Status
  linkedTo?: StatusLink
  level?: number
} & Partial<Targeted>

type EffectMove = {
  type: 'move'
  move: 'beforeSP'
}

type EffectRivalGiveStatus = {
  type: 'giveRivalStatus'
  giveStatus: Status
  level?: number
} & Partial<TargetedRival>

type IdentEffect = EffectUs | EffectRival

type EffectRival = EffectRivalGiveStatus

type EffectUs =
  | EffectScoreMultiplier
  | EffectCtDecrsase
  | EffectStamRecovery
  | EffectGiveStatus
  | EffectMove

type IdentCondition = {
  type: 'when'
  when: Condition
}

type IdentStaminaCost = {
  type: 'staminaCost'
  staminaCost: number
}

type IdentCT = {
  type: 'ct'
  ct: number
}

type IdentLimitOnce = {
  type: 'limit'
  limit: 'once'
}

type IdentLimitLength = {
  type: 'limit'
  length: number
}

type IdentLimit = IdentLimitOnce | IdentLimitLength

export type Ident =
  | IdentCondition
  | IdentEffect
  | IdentStaminaCost
  | IdentCT
  | IdentLimit

export type MatchQuery = string | RegExp

export type Matcher = {
  spec: (MatchQuery | [string, MatchQuery[]])[]
  body: (r: Record<string, string>) => Ident
}
