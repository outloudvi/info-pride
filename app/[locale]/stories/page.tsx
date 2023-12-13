import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import StoriesPageMainView from '#components/stories/StoriesPageMainView'
import { withMessages } from '#utils/withMessages'

const StoriesPage = () => {
    const $t = useTranslations('stories')

    return (
        <>
            <h2>{$t('Stories')}</h2>
            <StoriesPageMainView />
        </>
    )
}

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: string }
}) {
    const $t = await getTranslations({ locale, namespace: 'stories' })
    return {
        title: $t('Stories'),
    }
}

export default withMessages(StoriesPage, ['stories'])
