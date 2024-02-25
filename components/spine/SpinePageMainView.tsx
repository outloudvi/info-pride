'use client'

import { useTranslations } from 'next-intl'
import { Alert, Button, Flex, NativeSelect } from '@mantine/core'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import type { SearchParams } from './sp'

import useApi from '#utils/useApi'
import { PrimaryCharacterIds } from '#data/vendor/characterId'
import SpineView from '#components/spine/SpineView'
import useSetSearchParams from '#utils/useSetSearchParams'

const SpineViewWrapper = () => {
    const $t = useTranslations('spine')
    const $vc = useTranslations('v-chr')
    const searchParams = useSearchParams()

    const [initSync, setInitSync] = useState(false)
    const [id, setId] = useState('')
    const urlId = searchParams.get('id') ?? ''
    const { setSearch } = useSetSearchParams<SearchParams>()

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
            setSearch('id', id)
        }
    }, [id, initSync, setSearch, urlId])

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

const SpinePageMainView = () => {
    const [userHasLicense, setUserHasLicense] = useState(false)

    return (
        <>
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

export default SpinePageMainView
