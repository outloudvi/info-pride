import type { SeriesName } from '#data/stories'
import { ChapterItem } from '#data/types'

export type IStoriesData<T> = Record<
    SeriesName,
    Record<number, Record<number, T>>
>

export type StoriesData = {
    data: IStoriesData<ChapterItem>
    special: ChapterItem[]
}
