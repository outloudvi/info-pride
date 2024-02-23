'use client'

import { NavLink } from '@mantine/core'
import type { EventStory } from 'hoshimi-types/ProtoMaster'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import type { SearchParams } from './sp'

import useSetSearchParams from '#utils/useSetSearchParams'
import { eventGroup } from '#data/videos/eventStories.data'

type IdentityFunction<V> = (v: V) => v is NonNullable<V>

function guessDate(id: string): string | null {
    const yymm = id.split('-')?.[2]
    if (!yymm) return null
    return '20' + yymm.slice(0, 2) + '/' + yymm.slice(2, 4)
}

const EventStoriesList = ({
    eventStories,
}: {
    eventStories: Pick<EventStory, 'id' | 'description'>[]
}) => {
    const $ev = useTranslations('v-event-name')

    const params = useSearchParams()
    const currEventId = params.get('id')
    const { setSearch } = useSetSearchParams<SearchParams>()

    return (
        <div className="h-[65vh] overflow-y-auto">
            {eventStories.map((item, key) => {
                const props = [guessDate(item.id), eventGroup[item.id]]
                    .filter(
                        Boolean as unknown as IdentityFunction<string | null>,
                    )
                    .join(', ')
                return (
                    <NavLink
                        key={key}
                        active={currEventId === item.id}
                        variant="light"
                        onClick={() => {
                            setSearch('id', item.id)
                        }}
                        label={`${$ev(item.description)} ${
                            props && `(${props})`
                        }`}
                    />
                )
            })}
        </div>
    )
}

export default EventStoriesList
