import type EmblemTypes from '#data/emblemTypes'

export type SearchParams = {
    /**
     * Filter name.
     */
    s: keyof typeof EmblemTypes
}
