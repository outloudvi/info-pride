import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'

import EmblemList from '#components/emblems/EmblemList'
import { withMessages } from '#utils/withMessages'
import type { SearchParams } from '#components/emblems/sp'
import EmblemSearch from '#components/emblems/EmblemSearch'

const EmblemsPage = ({ searchParams }: { searchParams: SearchParams }) => {
    const $t = useTranslations('emblems')

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
