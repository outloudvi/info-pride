import { useEffect, useState } from 'react'
import { showNotification } from '@mantine/notifications'
import { Button, Checkbox, Grid } from '@mantine/core'
import rfdc from 'rfdc'
import { useTranslations } from 'next-intl'

import type { Card } from '#data/wikiPages/cards'
import { CharacterId } from '#data/vendor/characterId'
import { LOCALSTORAGE_BOX_TAG } from '#utils/startupHook'
import Title from '#components/Title'
import useFrontendApi from '#utils/useFrontendApi'
import getI18nProps from '#utils/getI18nProps'

const clone = rfdc({
    proto: true,
})

export type LocalBox = Partial<Record<CharacterId, boolean[]>>

const SettingsPage = () => {
    const $t = useTranslations('settings')
    const $vc = useTranslations('v-chr')
    const $c = useTranslations('common')

    const [localBox, setLocalBox] = useState<LocalBox>({})
    const { data: Cards } = useFrontendApi('cards')

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
            message: $t('Your settings have been saved.'),
            color: 'green',
        })
    }

    return (
        <>
            <Title title={$t('Settings')} />
            <h3>{$t('My box')}</h3>
            <p>{$t('mybox_header')}</p>
            {Cards ? (
                <Grid gutter={20}>
                    {Object.entries(Cards).map(([name], _key) => (
                        <Grid.Col key={_key} xs={12} lg={3} className="rounded">
                            <b>{$vc(name)}</b>
                            <div>
                                {Object.values(
                                    Cards[name as keyof typeof Cards]
                                ).map((card: Card, __key) => (
                                    <Checkbox
                                        key={__key}
                                        label={
                                            <div className="text-lg">
                                                <span>{card.nameCn}</span>{' '}
                                                <br />
                                                <small>{card.nameJa}</small>
                                            </div>
                                        }
                                        checked={Boolean(
                                            localBox?.[card.ownerSlug]?.[
                                                card.ownerId
                                            ]
                                        )}
                                        onChange={(e) => {
                                            updateLocalBox(
                                                card.ownerSlug,
                                                card.ownerId,
                                                e.target.checked
                                            )
                                        }}
                                        className="mt-2"
                                    ></Checkbox>
                                ))}
                            </div>
                        </Grid.Col>
                    ))}
                </Grid>
            ) : (
                <p>{$c('loading')}</p>
            )}
            <Button variant="outline" onClick={() => saveLocalBox()}>
                {$t('Save')}
            </Button>
        </>
    )
}

export const getStaticProps = getI18nProps(['settings', 'v-chr'])

export default SettingsPage
