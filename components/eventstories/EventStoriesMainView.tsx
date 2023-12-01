'use client'

import { Grid, NavLink } from '@mantine/core'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

import EventStoryView from './EventStoryView'

import type { APIResponseOf } from '#utils/api'
import { eventGroup } from '#data/videos/eventStories.data'

type IdentityFunction<V> = (v: V) => v is NonNullable<V>

function guessDate(id: string): string | null {
    const yymm = id.split('-')?.[2]
    if (!yymm) return null
    return '20' + yymm.slice(0, 2) + '/' + yymm.slice(2, 4)
}

const EventStoriesMainView = ({
    EventStoriesData,
}: {
    EventStoriesData: APIResponseOf<'EventStory/List'>
}) => {
    const $ev = useTranslations('v-event-name')

    const [currEvent, setCurrEvent] = useState<
        APIResponseOf<'EventStory/List'>[number] | null
    >(null)

    return (
        <Grid gutter={20} className="my-3">
            <Grid.Col span={{ base: 12, lg: 3 }}>
                <div className="h-[65vh] overflow-y-auto">
                    {EventStoriesData.sort((a, b) => b.order - a.order).map(
                        (item, key) => {
                            const props = [
                                guessDate(item.id),
                                eventGroup[item.id],
                            ]
                                .filter(
                                    Boolean as unknown as IdentityFunction<
                                        string | null
                                    >,
                                )
                                .join(', ')
                            return (
                                <NavLink
                                    key={key}
                                    active={currEvent?.id === item.id}
                                    variant="light"
                                    onClick={() => {
                                        setCurrEvent(item)
                                    }}
                                    label={`${$ev(item.description)} ${
                                        props && `(${props})`
                                    }`}
                                />
                            )
                        },
                    )}
                </div>
            </Grid.Col>
            <Grid.Col span={{ base: 12, lg: 9 }}>
                {currEvent && <EventStoryView currEvent={currEvent} />}
            </Grid.Col>
        </Grid>
    )
}

export default EventStoriesMainView
