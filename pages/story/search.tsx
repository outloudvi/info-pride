import { useTranslations } from 'next-intl'
import { Badge, Group, Skeleton, Stack, TextInput } from '@mantine/core'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'
import { useDebouncedValue } from '@mantine/hooks'
import { useEffect, useState } from 'react'

import Title from '#components/Title'
import getI18nProps from '#utils/getI18nProps'
import useApi from '#utils/useApi'
import StorySearchItem from '#components/story/search/StorySearchItem'
import withQueryParam from '#utils/withQueryParam'

const StorySearchPage = () => {
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
            <Group>
                <Title title={$t('Story search')} />
                <Badge>beta</Badge>
            </Group>
            <p>{$t('description')}</p>
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

export const getServerSideProps = getI18nProps(['story_search'])

export default withQueryParam(StorySearchPage)
