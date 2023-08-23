import { useTranslations } from 'next-intl'
import { Alert, Badge, Button, Group, TextInput } from '@mantine/core'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import Link from 'next/link'

import Title from '#components/Title'
import getI18nProps from '#utils/getI18nProps'
import SpineView from '#components/spine/SpineView'
import withQueryParam from '#utils/withQueryParam'

const AboutPage = () => {
    const $t = useTranslations('spine')

    const [userHasLicense, setUserHasLicense] = useState(false)
    const [id, setId] = useQueryParam(
        'id',
        withDefault(StringParam, 'spi_sd_chr_cos_rui-idol-00')
    )

    const [idInput, setIdInput] = useState(id)

    useEffect(() => {
        setIdInput(id)
    }, [id])

    return (
        <>
            <Group>
                <Title title={$t('Spine viewer')} />
                <Badge>beta</Badge>
            </Group>
            {userHasLicense ? (
                <>
                    <Group className="lg:w-1/3">
                        <TextInput
                            className="flex-grow"
                            label={$t('Spine ID')}
                            value={idInput}
                            onChange={(e) => setIdInput(e.target.value)}
                            withAsterisk
                        />
                        <Button onClick={() => setId(idInput)}>
                            {$t('View')}
                        </Button>
                    </Group>
                    <SpineView id={id} />
                </>
            ) : (
                <>
                    <Alert
                        color="blue"
                        title={$t('Spine license confirmation')}
                    >
                        <p>
                            {$t.rich('license_info', {
                                link: (c) => (
                                    <Link href="https://esotericsoftware.com/spine-editor-license">
                                        {(c as ReactNode[])[0]}
                                    </Link>
                                ),
                            })}
                        </p>
                        <Button onClick={() => setUserHasLicense(true)}>
                            {$t('btn_license_confirmed')}
                        </Button>
                    </Alert>
                </>
            )}
        </>
    )
}

export const getStaticProps = getI18nProps(['spine'])

export default withQueryParam(AboutPage)
