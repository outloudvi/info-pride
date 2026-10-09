export const CARD_CACHE_SECONDS = 60 * 60
export const DATA_CACHE_SECONDS = 12 * 60 * 60

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
