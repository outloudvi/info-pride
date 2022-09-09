import { useContext, useEffect, useState } from 'react'
import { showNotification } from '@mantine/notifications'
import { Button, Checkbox, Grid, Select } from '@mantine/core'
import rfdc from 'rfdc'
import { useLocale } from 'next-intl'

import localeList from 'locales/locales'

import type { Card } from '#data/wikiPages/cards'
import { CharacterChineseNameList, CharacterId } from '#data/vendor/characterId'
import { LOCALSTORAGE_BOX_TAG } from '#utils/startupHook'
import Title from '#components/Title'
import useFrontendApi from '#utils/useFrontendApi'
import LanguageContext from '#components/LanguageContext'
import { addI18nMessages } from '#utils/getI18nProps'

const clone = rfdc({
    proto: true,
})

export type LocalBox = Partial<Record<CharacterId, boolean[]>>

const SettingsPage = ({
    localeList,
}: {
    localeList: { slug: string; name: string }[]
}) => {
    const [localBox, setLocalBox] = useState<LocalBox>({})
    const { data: Cards } = useFrontendApi('cards')

    const lang = useLocale()
    const setLang = useContext(LanguageContext)

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
                title: '浏览器兼容性问题',
                message:
                    '此浏览器不支持 localStorage。请升级至更新的浏览器以保存设置。',
                color: 'red',
            })

            return
        }
        localStorage.setItem(LOCALSTORAGE_BOX_TAG, JSON.stringify(localBox))
        showNotification({
            title: '成功',
            message: '你的设置已经保存。',
            color: 'green',
        })
    }

    return (
        <>
            <Title title="设置" />
            <h3>语言 / Language</h3>
            <div>
                <Select
                    className="max-w-fit"
                    value={lang}
                    data={localeList.map(({ name, slug }) => ({
                        value: slug,
                        label: name,
                    }))}
                    onChange={setLang}
                />
            </div>
            <h3>我的 box</h3>
            <p>在此设置 box 后，搜索时将会显示卡片的持有状态。</p>
            {Cards ? (
                <Grid gutter={20}>
                    {Object.entries(Cards).map(([name], _key) => (
                        <Grid.Col key={_key} xs={12} lg={3} className="rounded">
                            <b>
                                {CharacterChineseNameList[name as CharacterId]}
                            </b>
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
                <p>正在加载卡片列表。</p>
            )}
            <Button variant="outline" onClick={() => saveLocalBox()}>
                保存
            </Button>
        </>
    )
}

export const getStaticProps = async () => ({
    props: {
        localeList,
        ...(await addI18nMessages()),
    },
})

export default SettingsPage
