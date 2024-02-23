'use client'

import { useTranslations } from 'next-intl'
import { Skeleton, Stack, TextInput } from '@mantine/core'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'
import { useDebouncedValue } from '@mantine/hooks'
import { useEffect, useState } from 'react'

import useApi from '#utils/useApi'
import StorySearchItem from '#components/search/story/StorySearchItem'
import withQueryParam from '#utils/withQueryParam'

const StorySearchMainView = () => {
    const $t = useTranslations('story_search')

    const [realQ, setRealQ] = useState('')
    const [debouncedQ] = useDebouncedValue(realQ, 700)
    const [q, setQ] = useQueryParam('q', withDefault(StringParam, ''))
    const { data, isLoading } = useApi('Search/Commu', {
        q,
    })

    useEffect(() => {
        setQ(debouncedQ)
    }, [debouncedQ, setQ])

    return (
        <>
            <div className="max-w-7xl mx-auto">
                <TextInput
                    value={realQ}
                    onChange={(event) => {
                        setRealQ(event.currentTarget.value)
                    }}
                    placeholder={$t('search_placeholder')}
                    className="mb-3"
                />
                {isLoading ? (
                    <Skeleton height={600} />
                ) : (
                    Array.isArray(data) && (
                        <Stack>
                            {data.map((x, key) => (
                                <StorySearchItem key={key} item={x} />
                            ))}
                        </Stack>
                    )
                )}
            </div>
        </>
    )
}

export default withQueryParam(StorySearchMainView)