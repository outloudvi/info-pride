export type Stories = Record<1 | 2 | 3, ChapterItem> &
    Partial<Record<'phone', Omit<ChapterItem, 'name'>>>

export type StoriesData = Record<string, Stories>
