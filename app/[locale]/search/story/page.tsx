import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import StorySearchMainView from '#components/search/story/StorySearchMainView'
import { withMessages } from '#utils/withMessages'

const StorySearchPage = () => {
    const $t = useTranslations('story_search')

    return (
        <>
            <h2>{$t('Story search')}</h2>
            <p>{$t('description')}</p>
            <StorySearchMainView />
        </>
    )
}

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: string }
}) {
    const $t = await getTranslations({ locale, namespace: 'story_search' })
    return {
        title: $t('Story search'),
    }
}

export default withMessages(StorySearchPage, ['story_search'])
