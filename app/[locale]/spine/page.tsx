import { Badge, Group } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

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
            <SpinePageMainView />
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
