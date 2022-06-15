import type { Skill } from 'hoshimi-types/ProtoMaster'

import type { APIResponseOf, UnArray } from '#utils/api'

export type CardTiny = UnArray<APIResponseOf<'Card'>>

export type MusicChartItem = {
  songTitle: string
  id: string
  desc: string
}

export type LintMessage = {
  text: string
  severity: 0 | 1 | 2 | 3
}

export type LintRule = (
  skills: readonly Skill[],
  chartLine: readonly number[]
) => LintMessage[] | void
