import { getTranslations } from 'next-intl/server'

import { fetchApi } from '#utils/fetchApi'
import PhotoAioView from '#components/photos/PhotoAioView'
import { withAsyncMessages } from '#utils/withMessages'

const PhotosPage = async () => {
    const PhotoAioNames = await fetchApi('Photo/AIO/Names')
    const $t = await getTranslations('photos')

    return (
        <>
            <h2>{$t('Photos')}</h2>
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
