import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { Badge, Group } from '@mantine/core'

import { fetchApi } from '#utils/fetchApi'
import PhotoAioView from '#components/photos/PhotoAioView'
import { withAsyncMessages } from '#utils/withMessages'
import type { ParamsWithLocale } from '#utils/types'

const PhotosPage = async ({ params: { locale } }: ParamsWithLocale) => {
    unstable_setRequestLocale(locale)
    const PhotoAioNames = await fetchApi('Photo/AIO/Names')
    const $t = await getTranslations('photos')

    return (
        <>
            <Group>
                <h2>{$t('Photos')}</h2>
                <Badge>beta</Badge>
            </Group>

            <p>{$t('photos_description')}</p>
            <PhotoAioView names={PhotoAioNames} />
        </>
    )
}

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: string }
}) {
    const $t = await getTranslations({ locale, namespace: 'photos' })
    return {
        title: $t('Photos'),
    }
}

export default withAsyncMessages(PhotosPage, [
    'photos',
    'cards_slug',
    'photo_ability_type',
])
