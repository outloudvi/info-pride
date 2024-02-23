import type EmblemTypes from '#data/emblemTypes'

export type SearchParams = {
    s: keyof typeof EmblemTypes
}
