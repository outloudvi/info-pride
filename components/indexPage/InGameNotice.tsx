'use client'

import { Anchor, Modal } from '@mantine/core'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import type { APIMapping } from 'hoshimi-types'
import { useTranslations } from 'next-intl'

import useApi from '#utils/useApi'
import type { APIResponseOf } from '#utils/api'

type NoticeType = Parameters<APIMapping['Notice']>[number]['type']

const InGameNotice = ({ type }: { type: NoticeType }) => {
    const $t = useTranslations('index')
    const [limit, setLimit] = useState(5)
    const { data: NewsData, isLoading } = useApi('Notice', {
        limit: String(limit),
        type,
    })
    const [news, setNews] = useState<APIResponseOf<'Notice'>>([])
    const [modalOpened, setModalOpened] = useState(false)
    const [modalNews, setModalNews] = useState<
        APIResponseOf<'Notice'>[number] | null
    >(null)

    useEffect(() => {
        if (NewsData === undefined) return
        setNews(NewsData ?? [])
    }, [NewsData])

    return news && news.length > 0 ? (
        <>
            <Modal
                opened={modalOpened}
                onClose={() => setModalOpened(false)}
                title={modalNews?.title}
                size="xl"
            >
                <iframe
                    title="modal"
                    className="text-center h-[75vh] w-full"
                    src={`/api/notifProxy?url=${encodeURIComponent(modalNews?.linkDetail ?? '')}`}
                ></iframe>
                <div className="text-center">
                    {$t('Published: ')}{' '}
                    {modalNews &&
                        dayjs(new Date(Number(modalNews.startTime))).format(
                            'YYYY-MM-DD',
                        )}
                </div>
            </Modal>
            <ul>
                {news.map((item, key) => {
                    const { title, linkDetail } = item
                    const linkBody = linkDetail ? (
                        <Anchor
                            onClick={() => {
                                setModalNews(item)
                                setModalOpened(true)
                            }}
                            lang="ja"
                        >
                            {title}
                        </Anchor>
                    ) : (
                        <span lang="ja">{title}</span>
                    )
                    return (
                        <li key={key}>
                            {linkBody}{' '}
                            <small>
                                {dayjs(Number(item.startTime)).format(
                                    'YYYY-MM-DD',
                                )}
                            </small>
                        </li>
                    )
                })}
            </ul>
            {news.length >= limit &&
                (isLoading ? (
                    <span>{$t('loading_news')}</span>
                ) : (
                    <Anchor
                        onClick={() => {
                            setLimit((x) => x + 5)
                        }}
                    >
                        {$t('More')}
                    </Anchor>
                ))}
        </>
    ) : (
        <p className="text-gray-500">{$t('loading_news')}</p>
    )
}

export default InGameNotice
