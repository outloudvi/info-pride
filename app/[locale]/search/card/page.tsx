import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

import { withAsyncMessages } from '#utils/withMessages'
import type { ParamsWithLocale } from '#utils/types'
import SearchCardPageWrapper from '#components/search/card/SearchCardPageWrapper'

const CardSearchPage = async ({ params }: ParamsWithLocale) => {
    const { locale } = await params
    unstable_setRequestLocale(locale)
    return <SearchCardPageWrapper />
}

// TODO: [FIXME] Use server-side filtering
export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params
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
