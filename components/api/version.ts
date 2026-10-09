import { DATA_CACHE_SECONDS } from '#utils/cachePolicy'

export async function getVersion(): Promise<{
    releaseDate: string
    versionDisplay: string
} | null> {
    const json = await fetch(
        'https://itunes.apple.com/lookup?id=1535925293&country=jp',
        { next: { revalidate: DATA_CACHE_SECONDS } },
    ).then((x) => x.json())

    const result = json.results[0]
    return {
        versionDisplay: result.version,
        releaseDate: result.currentVersionReleaseDate,
    }
}
