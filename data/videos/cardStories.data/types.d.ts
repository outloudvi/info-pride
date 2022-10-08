type Stories = Record<1 | 2 | 3, ChapterItem> &
    Partial<Record<'phone', Omit<ChapterItem, 'name'>>>

export type StoriesData = Record<
    string,
    Stories | null // use null when no card stories exist (e.g. Mana Premium)
>
