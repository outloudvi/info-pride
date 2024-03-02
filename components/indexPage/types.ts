export type EventItem = {
    title: string
    type: EventType
    start: number
    end: number
    link?: string
}

export type IndexEventItem =
    | {
          start: number
          end: number
      }
    | {
          nextStart: number
      }

export enum EventType {
    NormalGacha,
    LimitedGacha,
    PickupGacha,
    NormalTour,
    LinksTour,
    VenusBattle,
    VenusTournament,
    UnionBattle,
    Shooting,
    AprilFools,
    MessageEvent,
    Training,
    MultiLinks,
    VenusLeague,
    BirthdayGacha,
    ImageTraining,
    Moshikoi,
    MedleyLive,
}
