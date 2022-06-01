import { ExternalVideo } from '#components/ExternalVideo'

export type ChapterItem = {
  name: string
  video: ExternalVideo
}

export type Stories = Record<1 | 2 | 3, ChapterItem> &
  Partial<Record<'phone', Omit<ChapterItem, 'name'>>>
