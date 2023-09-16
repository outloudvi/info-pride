import { useTranslations } from 'next-intl'
import { Badge, Group, Skeleton, Stack, TextInput } from '@mantine/core'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'
import { useDebouncedValue } from '@mantine/hooks'
import { useEffect, useState } from 'react'

import Title from '#components/Title'
import getI18nProps from '#utils/getI18nProps'
import useApi from '#utils/useApi'
import MessageSearchItem from '#components/search/message/MessageSearchItem'
import withQueryParam from '#utils/withQueryParam'

const MessageSearchPage = () => {
    const $t = useTranslations('message_search')

    const [realQ, setRealQ] = useState('')
    const [debouncedQ] = useDebouncedValue(realQ, 700)
    const [q, setQ] = useQueryParam('q', withDefault(StringParam, ''))
    const { data, isLoading } = useApi('Search/Message', {
        q,
    })

    useEffect(() => {
        setQ(debouncedQ)
    }, [debouncedQ, setQ])

    return (
        <>
            <Group>
                <Title title={$t('Message Search')} />
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
                                <MessageSearchItem key={key} item={x} />
                            ))}
                        </Stack>
                    )
                )}
            </div>
        </>
    )
}

export const getStaticProps = getI18nProps(['message_search', 'v-chr'])

export default withQueryParam(MessageSearchPage)
