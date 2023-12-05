import { Skeleton } from '@mantine/core'
import { getTranslations } from 'next-intl/server'

import EventItem from './EventItem'

import getCurrentEvents from '#components/api/currentEvents'

const CurrentEvents = async () => {
    const CurrentEvents = await getCurrentEvents()
    const $t = await getTranslations('index')

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
