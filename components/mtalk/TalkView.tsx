import { useEffect, useMemo, useState } from 'react'
import { useLocalStorage } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import { useTranslations } from 'next-intl'

import type { CharacterIdWithManager, CommuLine, EditorPref } from './types'
import Preview from './Preview'
import Compose from './Compose'
import EditorMenu from './EditorMenu'
import ImportModal from './ImportModal'
import svgToPngDataUrl from './svgToPngDataUrl'

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
    })
    const commuJson = useMemo(
        () => JSON.stringify(commuData, null, 2),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [pref.importExportModal]
    )
    useEffect(() => {
        if (!pref.setupExportAsImage) return
        showNotification({
            message: $t('n_export_image'),
            color: 'blue',
        })
        fetch('/api/img/mtalk', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                lines: commuData,
            }),
        })
            .then((x) => x.text())
            .then(svgToPngDataUrl)
            .then((dataUrl) => {
                downloadUrl(dataUrl, 'macarontalk.png')
                showNotification({
                    message: $t('n_image_exported'),
                    color: 'green',
                })
            })
            .catch((e) => {
                showNotification({
                    title: $t('n_error_export_image'),
                    message: String(e),
                    color: 'red',
                })
            })
        setPref((x) => ({
            ...x,
            setupExportAsImage: false,
        }))
    }, [$t, commuData, pref.setupExportAsImage])

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
                }}
            >
                <div className="min-h-0 overflow-y-auto">
                    <Preview
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
