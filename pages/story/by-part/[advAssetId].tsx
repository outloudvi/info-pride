import { useTranslations } from 'next-intl'
import { Alert } from '@mantine/core'

import { addI18nMessages } from '#utils/getI18nProps'
import type { APIResponseOf } from '#utils/api'
import Paths from '#utils/paths'

const StoryRedirectFailedPage = () => {
    // This page will only be displayed if the redirect attempt failed.
    const $t = useTranslations('storyreplay')
    return (
        <Alert color="red" title={$t('story_not_found')}>
            {$t('story_not_found')}
        </Alert>
    )
}

export const getServerSideProps = async ({
    params,
    locale,
}: {
    params: { advAssetId: string }
    locale: string
}) => {
    const { advAssetId } = params
    const url = new URL(Paths.api('Story/Reverse'))
    url.searchParams.set('advAssetId', advAssetId)
    const storyId = await fetch(String(url))
        .then((x) => x.json())
        .then((x) => (x as APIResponseOf<'Story/Reverse'>).id)
        .catch(() => undefined)
    if (storyId) {
        return {
            redirect: {
                permanent: false,
                destination: `/story/${storyId}`,
            },
        }
    }
    return {
        props: {
            ...(await addI18nMessages(locale, ['storyreplay'])),
        },
    }
}

export default StoryRedirectFailedPage
