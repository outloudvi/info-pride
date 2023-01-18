export type EventItem = {
    title: string
    type: EventType
    start: number
    end: number
    link?: string
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
    VenusLeague
}
