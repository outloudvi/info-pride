import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { Suspense } from 'react'
import { Skeleton } from '@mantine/core'

import { withAsyncMessages } from '#utils/withMessages'
import { fetchApi } from '#utils/fetchApi'
import UnitsPageMainView from '#components/units/UnitsPageMainView'
import type { ParamsWithLocale } from '#utils/types'

const UnitsPage = async ({ params: { locale } }: ParamsWithLocale) => {
    unstable_setRequestLocale(locale)
    const $t = await getTranslations('units')

    const CardData = await fetchApi('Card')
    const ChartListData = await fetchApi('MusicChartList')

    return (
        <>
            <h2>{$t('Units')}</h2>
            <Suspense fallback={<Skeleton height={600} />}>
                <UnitsPageMainView
                    CardData={CardData}
                    ChartListData={ChartListData}
                />
            </Suspense>
        </>
    )
}

export default withAsyncMessages(UnitsPage, ['units', 'vendor', 'v-chr'])
