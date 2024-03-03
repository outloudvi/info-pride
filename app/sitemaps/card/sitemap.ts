import type { MetadataRoute } from 'next'

import { fetchApi } from '#utils/fetchApi'
import { MAX_LEVEL, MAX_RARITY } from '#utils/constants'
import Paths from '#utils/paths'
import locales from '#locales/locales.json'

export default async function sitemap() {
    const cards = await fetchApi('Card/List', {
        level: String(MAX_LEVEL),
        rarity: String(MAX_RARITY),
    })

    return cards
        .map(
            (x) =>
                locales.map((locale) => ({
                    url: Paths.self(`/${locale}/card/${x.id}`),
                    changeFrequency: 'never',
                })) as MetadataRoute.Sitemap,
        )
        .reduce((a, b) => [...a, ...b])
}
