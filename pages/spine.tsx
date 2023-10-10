import { useTranslations } from 'next-intl'
import { Alert, Badge, Button, Flex, Group, NativeSelect } from '@mantine/core'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

import Title from '#components/Title'
import getI18nProps from '#utils/getI18nProps'
import withQueryParam from '#utils/withQueryParam'
import useApi from '#utils/useApi'
import { PrimaryCharacterIds } from '#data/vendor/characterId'

const SpineView = dynamic(() => import('#components/spine/SpineView'), {
    ssr: false,
})

const SpineViewWrapper = () => {
    const $t = useTranslations('spine')
    const $vc = useTranslations('v-chr')

    const [initSync, setInitSync] = useState(false)
    const [id, setId] = useState('')
    const [urlId, setUrlId] = useQueryParam('id', withDefault(StringParam, ''))

    const [idInput, setIdInput] = useState(urlId)
    const [characterId, setCharacterId] = useState('char-ktn')
    const { data: ChibiData } = useApi('Costume/Chibi', {
        characterId,
    })

    useEffect(() => {
        if (ChibiData) {
            setIdInput(ChibiData[0].sdAssetId)
        }
    }, [ChibiData])

    useEffect(() => {
        if (urlId !== '' && !initSync) {
            setId(urlId)
            setIdInput(urlId.replace('spi_sd_chr_cos_', ''))
            setInitSync(true)
        } else if (id !== '') {
            setUrlId(id)
        }
    }, [id, initSync, setUrlId, urlId])

    return (
        <>
            <Flex className="flex-col md:flex-row gap-4 mb-2 max-w-xl md:items-end">
                <NativeSelect
                    className="grow-[3]"
                    data={PrimaryCharacterIds.map((v) => ({
                        label: $vc(v),
                        value: v,
                    }))}
                    value={characterId}
                    onChange={(event) =>
                        setCharacterId(event.currentTarget.value)
                    }
                    label={$t('Character')}
                    withAsterisk
                />
                <NativeSelect
                    className="grow-[4]"
                    data={
                        ChibiData?.map(({ sdAssetId, name }) => ({
                            value: sdAssetId,
                            label: name,
                        })) ?? []
                    }
                    value={idInput}
                    onChange={(event) => setIdInput(event.currentTarget.value)}
                    label={$t('Costume')}
                    withAsterisk
                />
                <Button
                    className="flex-grow"
                    onClick={() => setId(`spi_sd_chr_cos_${idInput}`)}
                    disabled={idInput === ''}
                >
                    {$t('View')}
                </Button>
            </Flex>
            {id && <SpineView id={id} />}
        </>
    )
}

const LicenseCheck = ({ confirm }: { confirm: () => void }) => {
    const $t = useTranslations('spine')

    return (
        <Alert color="blue" title={$t('Spine license confirmation')}>
            <p>
                {$t.rich('license_info', {
                    link: (c) => (
                        <Link href="https://esotericsoftware.com/spine-editor-license">
                            {(c as ReactNode[])[0]}
                        </Link>
                    ),
                })}
            </p>
            <Button onClick={confirm}>{$t('btn_license_confirmed')}</Button>
        </Alert>
    )
}

const SpinePage = () => {
    const $t = useTranslations('spine')
    const [userHasLicense, setUserHasLicense] = useState(false)

    return (
        <>
            <Group>
                <Title title={$t('Spine viewer')} />
                <Badge>beta</Badge>
            </Group>
            {userHasLicense ? (
                <SpineViewWrapper />
            ) : (
                <LicenseCheck
                    confirm={() => {
                        setUserHasLicense(true)
                    }}
                />
            )}
        </>
    )
}

export const getStaticProps = getI18nProps([
    'spine',
    'spine_animation',
    'v-chr',
])

export default withQueryParam(SpinePage)
