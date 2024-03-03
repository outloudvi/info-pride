import { Button, Skeleton } from '@mantine/core'
import { useLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import { Link } from '#utils/navigation'
import { toVideoLink } from '#components/ExternalVideo'
import type { SeriesName } from '#data/stories'
import AssetImage from '#components/AssetImage'
import { fetchApi } from '#utils/fetchApi'
import storiesData from '#data/videos/stories.data'

type PropType = {
    // "Special" won't appear here
    series: Exclude<SeriesName, 'Special'>
    season: number
    chapter: number
}

function getBackendStoryId(props: PropType): string {
    const { series, season, chapter } = props
    const Prefix: Record<SeriesName, string> = {
        Hoshimi: 'st-original-cmn-01',
        Tokyo: 'st-main-cmn-01',
        Big4: 'st-main-cmn-02',
        TRINITYAiLE: 'st-group-tri-01',
        LizNoir: 'st-group-liz-01',
        Mana: 'st-group-mna-01',
        ThreeX: 'st-group-thrx-01',
        Tsuki: 'st-group-moon-01',
        Sunny: 'st-group-sun-01',
    }
    return [
        Prefix[series],
        String(season).padStart(2, '0'),
        String(chapter).padStart(2, '0'),
    ].join('-')
}

const StoriesItem = async (props: PropType) => {
    const { series, season, chapter } = props
    const $t = await getTranslations('stories')
    const $c = await getTranslations('common')
    const locale = useLocale()

    const StoryData = await fetchApi('Story', {
        id: getBackendStoryId(props),
    })
    const StoryTrnData = storiesData[locale].data[series][season][chapter]

    if (!StoryTrnData) {
        return (
            <>
                <div className="text-4xl">
                    {$t(`series.${series}`)} {$t('season', { s: season })} -{' '}
                    {chapter}
                </div>
                <Skeleton height={200} className="mt-2" />
            </>
        )
    }

    const subtitle = StoryData?.sectionName

    const localTitle =
        StoryTrnData?.name && StoryTrnData.name !== 'TODO'
            ? StoryTrnData.name
            : null
    const jaTitle = StoryData?.name?.replace(/\n/g, '')

    return (
        <>
            <div className="text-4xl">
                {$t(`series.${series}`)} {$t('season', { s: season })} -{' '}
                {chapter}
            </div>

            <div className="text-2xl">{subtitle}</div>
            <br />
            <div className="text-xl">
                {localTitle !== null ? (
                    <>
                        <span>{localTitle}</span> /{' '}
                        <small>
                            <span lang="ja">{jaTitle}</span>
                        </small>
                    </>
                ) : (
                    <span lang="ja">{jaTitle}</span>
                )}
            </div>
            {StoryData && (
                <div>
                    <p lang="ja">{StoryData.description}</p>
                    <Link href={`/story/${StoryData.id}`} passHref>
                        <Button>{$c('Story replay')}</Button>
                    </Link>
                    {StoryTrnData && (
                        <Link
                            href={toVideoLink(StoryTrnData.video)}
                            target="_blank"
                            rel="noopener noreferrer"
                            passHref
                        >
                            <Button className="ml-2">{$t('Video')}</Button>
                        </Link>
                    )}
                </div>
            )}

            {(StoryTrnData === undefined || localTitle === null) && (
                <div className="mt-4 mb-2 text-gray-500">
                    {$c.rich('no_trans', {
                        field: `StoriesData[${series}][${season}][${chapter}]`,
                        file: 'data/stories.data.ts',
                    })}
                </div>
            )}

            <AssetImage
                name={`img_story_thumb_${StoryData.advAssetIds[0]}`}
                ratio="16 / 9"
                alt="Story thumb image"
                className="my-2 mx-3"
            />
        </>
    )
}

export default StoriesItem
