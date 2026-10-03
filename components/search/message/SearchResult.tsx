import { Stack } from '@mantine/core'
import { getTranslations } from 'next-intl/server'

import MessageSearchItem from './MessageSearchItem'

import { fetchApi } from '#utils/fetchApi'

const SearchResult = async ({
    q,
    characterId,
}: {
    q: string
    characterId?: string
}) => {
    const $t = await getTranslations('message_search')
    const data = await fetchApi('Search/Message', {
        q,
        ...(characterId ? { characterId } : {}),
    })

    if (data.length === 0) {
        return <p>{$t('no_results')}</p>
    }

    return (
        <Stack>
            {data.map((x, key) => (
                <MessageSearchItem key={key} item={x} />
            ))}
        </Stack>
    )
}

export default SearchResult
