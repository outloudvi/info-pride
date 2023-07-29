import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocalStorage } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import { useTranslations } from 'next-intl'
import { toPng } from 'html-to-image'

import type { CharacterIdWithManager, CommuLine, EditorPref } from './types'
import Preview from './Preview'
import Compose from './Compose'
import EditorMenu from './EditorMenu'
import ImportModal from './ImportModal'

import downloadUrl from '#utils/downloadUrl'

const TalkView = ({ currChrId }: { currChrId: CharacterIdWithManager }) => {
    const $t = useTranslations('mtalk')

    const [commuData, setCommuData] = useLocalStorage<CommuLine[]>({
        key: 'mtalk-commu',
        defaultValue: [],
    })
    const [pref, setPref] = useState<EditorPref>({
        editMode: false,
        expandMenu: true,
        importExportModal: false,
        setupExportAsImage: false,
        setupScrollToBottom: false,
    })
    const previewRef = useRef<HTMLDivElement>(null)
    const commuJson = useMemo(
        () => JSON.stringify(commuData, null, 2),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [pref.importExportModal]
    )
    useEffect(() => {
        if (!pref.setupExportAsImage) return
        setPref((x) => ({
            ...x,
            setupExportAsImage: false,
        }))

        const previewElem = previewRef.current
        if (!previewElem) return
        showNotification({
            message: $t('n_export_image'),
            color: 'blue',
        })

        toPng(previewElem, {
            cacheBust: true,
        }).then((url) => {
            const now = new Date()
            downloadUrl(
                url,
                `macarontalk-${now.getFullYear()}${
                    now.getMonth() + 1
                }${now.getDate()}_${now.getHours()}${now.getMinutes()}${now.getSeconds()}.png`
            )
            showNotification({
                message: $t('n_image_exported'),
                color: 'green',
            })
        })
    }, [$t, commuData, pref.setupExportAsImage])

    useEffect(() => {
        if (!pref.setupScrollToBottom) return
        const cur = previewRef.current
        if (!cur) return
        const children = cur.children
        children[children.length - 1].scrollIntoView({
            block: 'end',
            behavior: 'smooth',
        })
        setPref((x) => ({
            ...x,
            setupScrollToBottom: false,
        }))
    }, [pref.setupScrollToBottom])

    return (
        <>
            <ImportModal
                commuJson={commuJson}
                open={pref.importExportModal}
                setPref={setPref}
                setCommuData={setCommuData}
            />
            <div
                className="grid h-full"
                style={{
                    gridTemplate:
                        '"Preview" 1fr "Compose" minmax(64px, min-content) "Menu" minmax(0px, min-content)',
                    flex: '0 0 600px',
                }}
            >
                <div className="min-h-0 overflow-y-auto">
                    <Preview
                        refItem={previewRef}
                        commu={commuData}
                        pref={pref}
                        setCommuData={setCommuData}
                    />
                </div>
                <div className="bg-blue-500">
                    <Compose
                        currChrId={currChrId}
                        setCommuData={setCommuData}
                        setPref={setPref}
                    />
                </div>
                <div
                    className={`bg-blue-500 ${
                        !pref.expandMenu ? 'hidden' : ''
                    }`}
                >
                    <EditorMenu setPref={setPref} />
                </div>
            </div>
        </>
    )
}

export default TalkView
