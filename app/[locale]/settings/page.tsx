import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

import SettingsPageMainView from '#components/settings/SettingsPageMainView'
import { withMessages } from '#utils/withMessages'
import type { ParamsWithLocale } from '#utils/types'

const SettingsPage = async ({ params }: ParamsWithLocale) => {
    const { locale } = await params
    unstable_setRequestLocale(locale)
    const $t = await getTranslations({ locale, namespace: 'settings' })

    return (
        <>
            <h2>{$t('Settings')}</h2>
            <SettingsPageMainView />
        </>
    )
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params
    const $t = await getTranslations({ locale, namespace: 'settings' })
    return {
        title: $t('Settings'),
    }
}

export default withMessages(SettingsPage, ['settings', 'v-chr'])
