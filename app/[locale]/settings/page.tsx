import { getTranslations } from 'next-intl/server'
import { useTranslations } from 'next-intl'

import SettingsPageMainView from '#components/settings/SettingsPageMainView'
import { withMessages } from '#utils/withMessages'

const SettingsPage = () => {
    const $t = useTranslations('settings')

    return (
        <>
            <h2>{$t('Settings')}</h2>
            <SettingsPageMainView />
        </>
    )
}

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: string }
}) {
    const $t = await getTranslations({ locale, namespace: 'settings' })
    return {
        title: $t('Settings'),
    }
}

export default withMessages(SettingsPage, ['settings', 'v-chr'])
