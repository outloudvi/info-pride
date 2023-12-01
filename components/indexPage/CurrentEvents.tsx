'use client'

import { Skeleton } from '@mantine/core'
import { useTranslations } from 'next-intl'

import EventItem from './EventItem'

import useFrontendApi from '#utils/useFrontendApi'

const CurrentEvents = () => {
    const { data: CurrentEvents } = useFrontendApi('currentEvents')

    const $t = useTranslations('index')

    return (
        <>
            <div className="text-gray-600 text-lg mb-3">
                {$t('Current events')}
            </div>
            {CurrentEvents !== undefined ? (
                CurrentEvents.length === 0 ? (
                    <p>{$t('no_events')}</p>
                ) : (
                    CurrentEvents.map((item, key) => (
                        <EventItem key={key} item={item} />
                    ))
                )
            ) : (
                <Skeleton height={200} />
            )}
        </>
    )
}

export default CurrentEvents
