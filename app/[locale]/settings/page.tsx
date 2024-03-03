import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'

import SettingsPageMainView from '#components/settings/SettingsPageMainView'
import { withMessages } from '#utils/withMessages'
import type { ParamsWithLocale } from '#utils/types'

const SettingsPage = ({ params: { locale } }: ParamsWithLocale) => {
    unstable_setRequestLocale(locale)
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
