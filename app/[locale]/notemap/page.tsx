import { getTranslations } from 'next-intl/server'

import NotemapPageMainView from '#components/notemap/NotemapPageMainView'
import type { APIResponseOf } from '#utils/api'
import { fetchApi } from '#utils/fetchApi'
import { withAsyncMessages } from '#utils/withMessages'

function removeDup(ChartListData: APIResponseOf<'MusicChartList'>) {
    return ChartListData.filter((x) => {
        if (x.charts.length > 0) return true
        return (
            ChartListData.find(
                (y) => y.assetId === x.assetId && y.charts.length > 0,
            ) === undefined
        )
    })
}

const NotemapPage = async () => {
    const $t = await getTranslations('notemap')
    const ChartListData = removeDup(await fetchApi('MusicChartList'))

    return (
        <>
            <h2>{$t('Notemaps')}</h2>
            <NotemapPageMainView ChartListData={ChartListData} />
        </>
    )
}

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: string }
}) {
    const $t = await getTranslations({ locale, namespace: 'notemap' })
    return {
        title: $t('Notemaps'),
    }
}

export default withAsyncMessages(NotemapPage, ['notemap'])
