import { Alert } from '@mantine/core'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

import DiaryPageMainView from '#components/diary/DiaryPageMainView'
import { withMessages } from '#utils/withMessages'
import type { ParamsWithLocale } from '#utils/types'

const DiaryPage = async ({ params }: ParamsWithLocale) => {
    const { locale } = await params
    unstable_setRequestLocale(locale)
    const $t = await getTranslations('diary')

    return (
        <>
            <h2>{$t('mana_diary')}</h2>
            <Alert color="pink">{$t('mana_diary_not_updating')}</Alert>
            <DiaryPageMainView />
        </>
    )
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params
    const $t = await getTranslations({ locale, namespace: 'diary' })
    return {
        title: $t('mana_diary'),
    }
}

export default withMessages(DiaryPage, ['diary'])
