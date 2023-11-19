import { useState } from 'react'
import { Grid, NavLink } from '@mantine/core'
import { useTranslations } from 'next-intl'

import Title from '#components/Title'
import useApi from '#utils/useApi'
import allFinished from '#utils/allFinished'
import PageLoading from '#components/PageLoading'
import type { APIResponseOf } from '#utils/api'
import EventStoryView from '#components/eventstories/EventStoryView'
import { addI18nMessages } from '#utils/getI18nProps'
import { eventGroup } from '#data/videos/eventStories.data'
import type { EventGroupData } from '#data/videos/eventStories.data/types'

function guessDate(id: string): string | null {
    const yymm = id.split('-')?.[2]
    if (!yymm) return null
    return '20' + yymm.slice(0, 2) + '/' + yymm.slice(2, 4)
}

type IdentityFunction<V> = (v: V) => v is NonNullable<V>

const EventStoriesPage = ({
    EventStoriesData,
    eventGroup,
}: {
    EventStoriesData: APIResponseOf<'EventStory/List'>
    eventGroup: EventGroupData
}) => {
    const $ev = useTranslations('v-event-name')
    const $t = useTranslations('eventstories')

    const [currEvent, setCurrEvent] = useState<
        APIResponseOf<'EventStory/List'>[number] | null
    >(null)
    return (
        <>
            <p>{$t('stories_ordering')}</p>
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
        </>
    )
}

const SkeletonEventStoriesPage = ({
    eventGroup,
}: {
    eventGroup: EventGroupData
}) => {
    const { data: EventStoriesData } = useApi('EventStory/List')
    const $t = useTranslations('eventstories')

    const allData = {
        EventStoriesData,
        eventGroup,
    }

    return (
        <>
            <Title title={$t('Event Stories')} />
            {allFinished(allData) ? (
                <EventStoriesPage {...allData} />
            ) : (
                <PageLoading data={allData} />
            )}
        </>
    )
}

export const getStaticProps = async ({ locale }: { locale: string }) => {
    return {
        props: {
            eventGroup,
            ...(await addI18nMessages(locale, [
                'v-event-name',
                'eventstories',
            ])),
        },
    }
}

export default SkeletonEventStoriesPage
