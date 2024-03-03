import { Divider } from '@mantine/core'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

import StoryReplayViewSkeleton from '#components/storyreplay/StoryReplayViewSkeleton'
import { fetchApi } from '#utils/fetchApi'
import { withAsyncMessages } from '#utils/withMessages'
import type { ParamsWithLocale } from '#utils/types'

const StoryReplayPage = async ({
    params: { id, locale },
}: {
    params: { id: string }
} & ParamsWithLocale) => {
    unstable_setRequestLocale(locale)
    const StoryData = await fetchApi('Story', {
        id,
    })

    const $t = await getTranslations('storyreplay')

    const items = StoryData.advAssetIds

    return (
        <>
            <div className="max-w-3xl mx-auto">
                {items.length === 0 ? (
                    <p>{$t('no_story')}</p>
                ) : items.length > 1 ? (
                    <>
                        {items.map((advAssetId, index) => (
                            <>
                                {index === 0 && (
                                    <p>
                                        {$t('multiple_parts', {
                                            len: items.length,
                                        })}
                                    </p>
                                )}
                                <Divider className="my-3" />
                                <p>{$t('story_part', { p: index + 1 })}</p>
                                {advAssetId.startsWith('adv-live') ? (
                                    <p>{$t('story_part_live')}</p>
                                ) : (
                                    <StoryReplayViewSkeleton
                                        id={advAssetId}
                                        storyId={StoryData.id}
                                        index={index}
                                    />
                                )}
                            </>
                        ))}
                    </>
                ) : (
                    <StoryReplayViewSkeleton
                        id={items[0]}
                        storyId={StoryData.id}
                        index={0}
                    />
                )}
            </div>
        </>
    )
}

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: string }
}) {
    const $t = await getTranslations({ locale, namespace: 'storyreplay' })
    return {
        title: $t('Story replay'),
    }
}

export default withAsyncMessages(StoryReplayPage, ['storyreplay'])
