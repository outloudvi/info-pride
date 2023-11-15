import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import { Divider } from '@mantine/core'

import PageLoading from '#components/PageLoading'
import Title from '#components/Title'
import getI18nProps from '#utils/getI18nProps'
import useApi from '#utils/useApi'
import allFinished from '#utils/allFinished'
import type { APIResponseOf } from '#utils/api'
import pickFirstOrOne from '#utils/pickFirstOrOne'
import StoryReplayViewSkeleton from '#components/storyreplay/StoryReplayViewSkeleton'

const StoryReplayPage = ({
    StoryData,
}: {
    StoryData: APIResponseOf<'Story'>
}) => {
    const $t = useTranslations('storyreplay')

    const items = StoryData.advAssetIds

    return (
        <>
            <Title title={$t('Story replay')} noh2 />
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

const SkeletonStoryReplayPage = () => {
    const router = useRouter()
    const $t = useTranslations('storyreplay')
    const id = pickFirstOrOne(router.query.id ?? '')
    const { data: StoryData } = useApi('Story', {
        id,
    })

    const allData = {
        StoryData,
    }

    return (
        <>
            <h2>{$t('Story replay')}</h2>
            {allFinished(allData) ? (
                <StoryReplayPage {...allData} />
            ) : (
                <PageLoading data={allData} />
            )}
        </>
    )
}

export const getServerSideProps = getI18nProps(['storyreplay'])

export default SkeletonStoryReplayPage
