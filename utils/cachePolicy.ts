export const CARD_CACHE_SECONDS = 60 * 60
export const DATA_CACHE_SECONDS = 12 * 60 * 60
export const ASSET_CACHE_SECONDS = 30 * 24 * 60 * 60

// Card pages also block on skill and ability payloads. Those stay on the
// 1h clock so a card view does not mix 1h stats with 12h skill text.
export function isCardCacheKey(key: string): boolean {
    const name = key.split('?')[0]
    if (name.startsWith('Card')) return true
    return (
        name === 'Skill' ||
        name.startsWith('Skill/') ||
        name === 'LiveAbility' ||
        name === 'ActivityAbility'
    )
}

export function cacheRevalidateSeconds(key: string): number {
    return isCardCacheKey(key) ? CARD_CACHE_SECONDS : DATA_CACHE_SECONDS
}
