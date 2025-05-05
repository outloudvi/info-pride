import type { Logic } from '#components/storyreplay/logicParser'

export type GameLogic = Record<string, [Logic, string | null][]>

export type MoshikoiConfig = {
    parts: Record<string, string>
    gameLogic: GameLogic
}
