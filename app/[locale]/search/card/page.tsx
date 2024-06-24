import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

import { withAsyncMessages } from '#utils/withMessages'
import type { ParamsWithLocale } from '#utils/types'
import SearchCardPageWrapper from '#components/search/card/SearchCardPageWrapper'

const CardSearchPage = async ({ params: { locale } }: ParamsWithLocale) => {
    unstable_setRequestLocale(locale)
    return <SearchCardPageWrapper />
}

// TODO: [FIXME] Use server-side filtering
export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: string }
}) {
    const $t = await getTranslations({ locale, namespace: 'search' })
    return {
        title: $t('Card search'),
    }
}

export default withAsyncMessages(CardSearchPage, [
    'search',
    'vendor',
    'v-chr',
    'v-card-alias',
])
