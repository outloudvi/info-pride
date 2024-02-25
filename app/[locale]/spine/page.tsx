import { Badge, Group, Skeleton } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'

import { withMessages } from '#utils/withMessages'

const SpinePageMainView = dynamic(
    () => import('#components/spine/SpinePageMainView'),
    { ssr: false },
)

const SpinePage = () => {
    const $t = useTranslations('spine')

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
    params: { locale },
}: {
    params: { locale: string }
}) {
    const $t = await getTranslations({ locale, namespace: 'spine' })
    return {
        title: $t('Spine viewer'),
    }
}

export default withMessages(SpinePage, ['spine', 'v-chr'])
