import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import EmblemsPageMainView from '#components/emblems/EmblemsPageMainView'
import { withMessages } from '#utils/withMessages'

const EmblemsPage = () => {
    const $t = useTranslations('emblems')

    return (
        <>
            <h2>{$t('Emblems')}</h2>
            <EmblemsPageMainView />
        </>
    )
}

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: string }
}) {
    const $t = await getTranslations({ locale, namespace: 'emblems' })
    return {
        title: $t('Emblems'),
    }
}

export default withMessages(EmblemsPage, ['emblems'])
