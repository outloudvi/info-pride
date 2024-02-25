import { Stack } from '@mantine/core'
import { getTranslations } from 'next-intl/server'

import StorySearchItem from './StorySearchItem'

import { fetchApi } from '#utils/fetchApi'

const SearchResult = async ({ q }: { q: string }) => {
    const $t = await getTranslations('story_search')
    const data = await fetchApi('Search/Commu', {
        q,
    })

    if (data.length === 0) {
        return <p>{$t('no_results')}</p>
    }

    return (
        <Stack>
            {data.map((x, key) => (
                <StorySearchItem key={key} item={x} />
            ))}
        </Stack>
    )
}

export default SearchResult
