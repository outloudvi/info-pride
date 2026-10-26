import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { Suspense } from 'react'

import EmblemList from '#components/emblems/EmblemList'
import { withMessages } from '#utils/withMessages'
import type { SearchParams } from '#components/emblems/sp'
import EmblemSearch from '#components/emblems/EmblemSearch'
import type { ParamsWithLocale } from '#utils/types'

const EmblemsPage = async ({
    searchParams: searchParamsPromise,
    params,
}: { searchParams: Promise<SearchParams> } & ParamsWithLocale) => {
    const searchParams = await searchParamsPromise
    const { locale } = await params
    unstable_setRequestLocale(locale)
    const $t = await getTranslations({ locale, namespace: 'emblems' })

    const search = searchParams.s ?? 'Various'

    return (
        <>
            <h2>{$t('Emblems')}</h2>
            <Suspense>
                <EmblemSearch />
            </Suspense>
            <Suspense>
                <EmblemList search={search} />
            </Suspense>
        </>
    )
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params
    const $t = await getTranslations({ locale, namespace: 'emblems' })
    return {
        title: $t('Emblems'),
    }
}

export default withMessages(EmblemsPage, ['emblems'])
