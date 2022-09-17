import { useState } from 'react'
import { Grid } from '@mantine/core'
import { useTranslations } from 'next-intl'

import Title from '#components/Title'
import useApi from '#utils/useApi'
import allFinished from '#utils/allFinished'
import PageLoading from '#components/PageLoading'
import { APIResponseOf } from '#utils/api'
import ListButton from '#components/ListButton'
import EventStoryView from '#components/eventstories/EventStoryView'
import { EventGroupData } from '#data/eventStories.data'
import getI18nProps from '#utils/getI18nProps'

function guessDate(id: string): string | null {
    const yymm = id.split('-')?.[2]
    if (!yymm) return null
    return '20' + yymm.slice(0, 2) + '/' + yymm.slice(2, 4)
}

type IdentityFunction<V> = (v: V) => v is NonNullable<V>

const EventStoriesPage = ({
    EventStoriesData,
}: {
    EventStoriesData: APIResponseOf<'EventStory/List'>
}) => {
    const $ev = useTranslations('events')
    const $t = useTranslations('eventstories')

    const [currEvent, setCurrEvent] = useState<
        APIResponseOf<'EventStory/List'>[number] | null
    >(null)
    return (
        <>
            <p>{$t('stories_ordering')}</p>
            <Grid gutter={20} className="my-3">
                <Grid.Col xs={12} lg={3}>
                    <div className="h-[65vh] overflow-y-auto">
                        {EventStoriesData.sort((a, b) => b.order - a.order).map(
                            (item, key) => {
                                const props = [
                                    guessDate(item.id),
                                    EventGroupData[item.id],
                                ]
                                    .filter(
                                        Boolean as unknown as IdentityFunction<
                                            string | null
                                        >
                                    )
                                    .join(', ')
                                return (
                                    <ListButton
                                        key={key}
                                        onClick={() => {
                                            setCurrEvent(item)
                                        }}
                                        selected={currEvent?.id === item.id}
                                    >
                                        {$ev(item.description)}{' '}
                                        {props && `(${props})`}
                                    </ListButton>
                                )
                            }
                        )}
                    </div>
                </Grid.Col>
                <Grid.Col xs={12} lg={9}>
                    {currEvent && <EventStoryView currEvent={currEvent} />}
                </Grid.Col>
            </Grid>
        </>
    )
}

const SkeletonEventStoriesPage = () => {
    const { data: EventStoriesData } = useApi('EventStory/List')
    const $t = useTranslations('eventstories')

    const allData = {
        EventStoriesData,
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

export const getStaticProps = getI18nProps(['events', 'eventstories'])

export default SkeletonEventStoriesPage
