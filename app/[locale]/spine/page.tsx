import { Badge, Group, Skeleton } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'

import SpinePageMainView from '#components/spine/SpinePageMainView'
import { withMessages } from '#utils/withMessages'

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
