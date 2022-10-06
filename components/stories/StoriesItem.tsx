import { Skeleton } from '@mantine/core'
import { useLocale, useTranslations } from 'next-intl'

import Paths from '#utils/paths'
import { toVideoLink } from '#components/ExternalVideo'
import useApi from '#utils/useApi'
import { SeriesName } from '#data/stories'
import AssetImage from '#components/AssetImage'
import useFrontendApi from '#utils/useFrontendApi'

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
    }
    return [
        Prefix[series],
        String(season).padStart(2, '0'),
        String(chapter).padStart(2, '0'),
    ].join('-')
}

const StoriesItem = (props: PropType) => {
    const { series, season, chapter } = props
    const $t = useTranslations('stories')
    const locale = useLocale()

    const { data: StoryData, isSuccess } = useApi('Story', {
        id: getBackendStoryId(props),
    })
    const { data: StoryTrnData } = useFrontendApi('stories', {
        locale,
        series,
        season: String(season),
        chapter: String(chapter),
    })

    if (!isSuccess) {
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
                </div>
            )}
            {StoryTrnData && (
                <p>
                    <a
                        href={toVideoLink(StoryTrnData.video)}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {$t('Video')}
                    </a>
                </p>
            )}

            {(StoryTrnData === undefined || localTitle === null) && (
                <div className="mt-4 text-gray-500">
                    尚无{StoryTrnData === undefined ? '剧情' : '标题'}
                    翻译信息。请添加翻译信息到{' '}
                    <a href={Paths.repo('data/stories.data.ts')}>
                        data/stories.data.ts
                    </a>{' '}
                    的 StoriesData[{series}][{season}][{chapter}] 。
                </div>
            )}

            <AssetImage
                name={`img_story_thumb_${StoryData.advAssetId}`}
                ratio="16 / 9"
                alt="Story thumb image"
                className="my-2 mx-3"
            />
        </>
    )
}

export default StoriesItem
