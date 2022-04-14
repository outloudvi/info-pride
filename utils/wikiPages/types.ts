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
  Self,
  Neighbour,
  Center,
  Everyone,
  Whoever,
  HighestNOfProp,
  SelectedN,
  ScorerN,
}

type Targeted = {
  on: TargetPerson
}

type Status = StatusSimple

export enum StatusSimple {
  Invisible,
  Focused,
  BadCond,
  HighSpirits,
  BeatScoring,
  ScoringUp,
  CritCoefUp,
  CritRateUp,
  StamDraiUp,
  StamDraiDn,
  SkilSuccUp,
  CombScorUp,
  NoBreak,
  AScorUp,
  VocalUp,
  DanceUp,
  VisualUp,
  VocalDn,
  DanceDn,
  VisualDn,
}

type Property = PropertySimple

export enum PropertySimple {
  Stamina,
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
  Vocal,
  Dance,
  Visual,
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

type Condition =
  | CondEveryBeat
  | CondBefore
  | CondOnStatus
  | CondOnProp
  | CondOnEvent
  | CondOnTrack

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
  level?: number
} & Partial<Targeted>

type IdentEffect =
  | EffectScoreMultiplier
  | EffectCtDecrsase
  | EffectStamRecovery
  | EffectGiveStatus

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
