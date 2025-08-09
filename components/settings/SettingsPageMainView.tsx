'use client'

import { showNotification } from '@mantine/notifications'
import { Button, Checkbox, Grid } from '@mantine/core'
import rfdc from 'rfdc'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { useLocalStorage } from '@mantine/hooks'

import { Link } from '#utils/navigation'
import { LOCALSTORAGE_BOX_TAG } from '#utils/startupHook'
import { CCIDTableWithName } from '#data/ccid'
import type { CharacterId } from '#data/vendor/characterId'
import { CharacterIds } from '#data/vendor/characterId'
import type { LocalBox } from '#components/settings/types'
import { USE_JP_STRINGS_DURING_SEARCH } from '#utils/constants'

const clone = rfdc({
    proto: true,
})

const SettingsPageMainView = () => {
    const $t = useTranslations('settings')
    const $vc = useTranslations('v-chr')

    const [useJpStr, setUseJpStr] = useLocalStorage({
        key: USE_JP_STRINGS_DURING_SEARCH,
        defaultValue: false,
    })
    const [tmpUseJpStr, setTmpUseJpStr] = useState(useJpStr)

    const [localBox, setLocalBox] = useState<LocalBox>({})

    useEffect(() => {
        try {
            const boxJson = localStorage.getItem(LOCALSTORAGE_BOX_TAG)
            if (boxJson === null) return
            const box = JSON.parse(boxJson)
            setLocalBox(box)
        } catch (_) {
            //
        }
    }, [])

    const updateLocalBox = (slug: CharacterId, id: number, have: boolean) => {
        const thisBox = clone(localBox)
        ;(thisBox[slug] ?? (thisBox[slug] = []))[id] = have
        setLocalBox(thisBox)
    }

    const saveLocalBox = () => {
        if (!window.localStorage) {
            showNotification({
                title: $t('Browser compatiblity problem'),
                message: $t('localstorage_unsupported'),
                color: 'red',
            })

            return
        }
        localStorage.setItem(LOCALSTORAGE_BOX_TAG, JSON.stringify(localBox))
        showNotification({
            title: $t('Success'),
            message: $t('settings_saved'),
            color: 'green',
        })
    }

    const saveSettings = () => {
        saveLocalBox()
        setUseJpStr(tmpUseJpStr)
    }

    return (
        <>
            <h3>{$t('Miscellaneous')}</h3>
            <Checkbox
                label={$t('use_jp_str')}
                checked={useJpStr}
                onChange={(e) => {
                    setTmpUseJpStr(e.target.checked)
                }}
                className="mt-2"
            ></Checkbox>
            <h3>{$t('My box')}</h3>
            <p>{$t('mybox_header')}</p>

            <Grid gutter={20} className="mb-2">
                {CharacterIds.map((chrId, _key) => (
                    <Grid.Col
                        key={_key}
                        span={{ base: 12, lg: 3 }}
                        className="rounded"
                    >
                        <b>{$vc(chrId)}</b>
                        {CCIDTableWithName[chrId].map((card) => (
                            <Checkbox
                                key={card.cardId}
                                label={
                                    <span>
                                        {card.nameJa}{' '}
                                        <Link href={`/cards/${card.cardId}`}>
                                            ➡️
                                        </Link>
                                    </span>
                                }
                                checked={Boolean(
                                    localBox?.[chrId]?.[card.ccid],
                                )}
                                onChange={(e) => {
                                    updateLocalBox(
                                        chrId,
                                        card.ccid,
                                        e.target.checked,
                                    )
                                }}
                                className="mt-2"
                            ></Checkbox>
                        ))}
                    </Grid.Col>
                ))}
            </Grid>
            <Button variant="outline" onClick={() => saveSettings()}>
                {$t('Save')}
            </Button>
        </>
    )
}

export default SettingsPageMainView
