import type { ChapterItem } from '#data/types'

export type ChapterData = Record<string, ChapterItem>
export type EventGroupData = Record<string, string>

export type EventStoriesData = {
    data: ChapterData
}
