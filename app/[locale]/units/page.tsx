import { getTranslations } from 'next-intl/server'

import { withAsyncMessages } from '#utils/withMessages'
import { fetchApi } from '#utils/fetchApi'
import UnitsPageMainView from '#components/units/UnitsPageMainView'

const UnitsPage = async () => {
    const $t = await getTranslations('units')

    const CardData = await fetchApi('Card')
    const ChartListData = await fetchApi('MusicChartList')

    return (
        <>
            <h2>{$t('Units')}</h2>
            <UnitsPageMainView
                CardData={CardData}
                ChartListData={ChartListData}
            />
        </>
    )
}

export default withAsyncMessages(UnitsPage, ['units'])
