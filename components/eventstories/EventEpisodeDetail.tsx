import { Blockquote, Button, Skeleton } from '@mantine/core'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'

import type { APIResponseOf } from '#utils/api'
import { toVideoLink } from '#components/ExternalVideo'
import useFrontendApi from '#utils/useFrontendApi'

const EventEpisodeDetail = ({
    id,
    story,
}: {
    id: string
    story: APIResponseOf<'Story'>
}) => {
    const $c = useTranslations('common')
    const { name: jaName, description } = story
    const locale = useLocale()
    const { data: VideoInfoData, isSuccess } = useFrontendApi(
        'eventStories',
        {
            id,
            locale,
        },
        !!locale
    )

    return (
        <>
            {isSuccess && VideoInfoData ? (
                <h3 lang="zh">
                    {VideoInfoData.name} /{' '}
                    <small lang="ja" className="">
                        {jaName}
                    </small>
                </h3>
            ) : (
                <h3 lang="ja">{jaName}</h3>
            )}
            <Blockquote>{description}</Blockquote>
            <Link href={`/story/${id}`} passHref>
                <Button>{$c('Story replay')}</Button>
            </Link>
            {VideoInfoData && (
                <Link
                    href={toVideoLink(VideoInfoData.video)}
                    target="_blank"
                    rel="noopener noreferrer"
                    passHref
                >
                    <Button className="ml-2">{$c('Video')}</Button>
                </Link>
            )}
            <div className="mt-2">
                {isSuccess ? (
                    !VideoInfoData && (
                        <div className="mt-4 text-gray-500">
                            {$c.rich('no_trans', {
                                field: `data[${id}]`,
                                file: 'data/eventStories.data.ts',
                            })}
                        </div>
                    )
                ) : (
                    <Skeleton height={120} />
                )}
            </div>
        </>
    )
}

export default EventEpisodeDetail
