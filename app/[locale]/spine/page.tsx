import { Badge, Group, Skeleton } from '@mantine/core'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { Suspense } from 'react'

import { withMessages } from '#utils/withMessages'
import type { ParamsWithLocale } from '#utils/types'
import SpinePageMainView from '#components/spine/SpinePageMainViewLazy'

const SpinePage = async ({ params }: ParamsWithLocale) => {
    const { locale } = await params
    unstable_setRequestLocale(locale)
    const $t = await getTranslations({ locale, namespace: 'spine' })

    return (
        <>
            <Group>
                <h2>{$t('Spine viewer')}</h2>
                <Badge>beta</Badge>
            </Group>
            <Suspense fallback={<Skeleton height={600} />}>
                <SpinePageMainView />
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
    const $t = await getTranslations({ locale, namespace: 'spine' })
    return {
        title: $t('Spine viewer'),
    }
}

export default withMessages(SpinePage, ['spine', 'v-chr'])
