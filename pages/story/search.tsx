import { useTranslations } from 'next-intl'
import { Badge, Group, Stack, TextInput } from '@mantine/core'
import { useState } from 'react'

import Title from '#components/Title'
import getI18nProps from '#utils/getI18nProps'
import useApi from '#utils/useApi'
import StorySearchItem from '#components/story/search/StorySearchItem'

const StorySearchPage = () => {
    const $t = useTranslations('story_search')

    const [q, setQ] = useState('')
    const { data } = useApi('Search/Commu', {
        q,
    })

    return (
        <>
            <Group>
                <Title title={$t('Story search')} />
                <Badge>beta</Badge>
            </Group>
            <p>{$t('description')}</p>
            <div className="max-w-7xl mx-auto">
                <TextInput
                    value={q}
                    onChange={(event) => {
                        setQ(event.currentTarget.value)
                    }}
                    placeholder={$t('search_placeholder')}
                    className="mb-3"
                />
                {Array.isArray(data) && (
                    <Stack>
                        {data.map((x, key) => (
                            <StorySearchItem key={key} item={x} />
                        ))}
                    </Stack>
                )}
            </div>
        </>
    )
}

export const getServerSideProps = getI18nProps(['story_search'])

export default StorySearchPage
