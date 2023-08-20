import { useTranslations } from 'next-intl'
import { Badge, Button, Group, TextInput } from '@mantine/core'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'
import { useState } from 'react'

import Title from '#components/Title'
import getI18nProps from '#utils/getI18nProps'
import SpineView from '#components/spine/SpineView'
import withQueryParam from '#utils/withQueryParam'

const AboutPage = () => {
    const $t = useTranslations('spine')

    const [id, setId] = useQueryParam(
        'id',
        withDefault(StringParam, 'spi_sd_chr_cos_rui-idol-00')
    )

    const [idInput, setIdInput] = useState(id)

    return (
        <>
            <Group>
                <Title title={$t('Spine viewer')} />
                <Badge>beta</Badge>
            </Group>
            <Group className="lg:w-1/3">
                <TextInput
                    className="flex-grow"
                    label={$t('Spine ID')}
                    value={idInput}
                    onChange={(e) => setIdInput(e.target.value)}
                    withAsterisk
                />
                <Button onClick={() => setId(idInput)}>{$t('View')}</Button>
            </Group>
            <SpineView id={id} />
        </>
    )
}

export const getStaticProps = getI18nProps(['spine'])

export default withQueryParam(AboutPage)
