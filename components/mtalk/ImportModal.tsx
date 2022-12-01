import { Button, Group, Modal, Textarea } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useTranslations } from 'next-intl'
import type { Dispatch, SetStateAction } from 'react'
import { useRef, useEffect, useState } from 'react'

import type { CommuLine, EditorPref } from './types'

import downloadUrl from '#utils/downloadUrl'

const ImportExportModal = ({
    commuJson,
    open,
    setPref,
    setCommuData,
}: {
    commuJson: string
    open: boolean
    setPref: Dispatch<SetStateAction<EditorPref>>
    setCommuData: Dispatch<SetStateAction<CommuLine[]>>
}) => {
    const $t = useTranslations('mtalk')

    const [text, setText] = useState('')
    useEffect(() => {
        setText(commuJson)
    }, [setText, commuJson])
    const inputFileRef = useRef<HTMLInputElement>(null)

    const close = () => {
        setPref((x) => ({
            ...x,
            importExportModal: false,
        }))
    }
    const importFromText = (x: string) => {
        let v
        try {
            v = JSON.parse(x)
        } catch (e) {
            showNotification({
                title: $t('n_import_failed'),
                message: $t('n_invalid_json'),
                color: 'red',
            })
            return
        }
        if (!Array.isArray(v)) {
            showNotification({
                title: $t('n_import_failed'),
                message: $t('n_not_array'),
                color: 'red',
            })
            return
        }
        setCommuData(v)
        showNotification({
            message: $t('n_import_success'),
            color: 'green',
        })
        close()
    }
    const importFromFile = () => {
        const c = inputFileRef.current
        if (!c) return
        c.click()
    }
    const saveAsFile = () => {
        const blob = new Blob([commuJson], {
            type: 'application/json',
        })
        downloadUrl(
            URL.createObjectURL(blob),
            `MacaronTalk-${(Number(new Date()) / 1000).toFixed(0)}.json`
        )
    }
    const handleImportFile = async () => {
        const c = inputFileRef.current
        if (!c) return
        if (!c.files?.length) return
        const file = c.files[0]
        const text = await file.text().catch((e) => {
            showNotification({
                title: $t('n_failed_to_read_file'),
                message: String(e),
                color: 'red',
            })
            return null
        })
        if (text === null) return
        importFromText(text)
    }

    return (
        <Modal
            opened={open}
            onClose={() => close()}
            title={$t('Import/Export')}
            size="65%"
        >
            <Textarea
                classNames={{
                    wrapper: 'h-[65vh]',
                    input: 'h-full',
                }}
                value={text}
                onChange={(e) => setText(e.currentTarget.value)}
            ></Textarea>
            <Group className="mt-2" position="center">
                <Button onClick={() => importFromText(text)}>
                    {$t('Import from text')}
                </Button>
                <Button onClick={() => importFromFile()}>
                    {$t('Import from file')}
                </Button>
                <Button onClick={() => saveAsFile()}>
                    {$t('Save as file')}
                </Button>
            </Group>
            <input
                title="hidden-input"
                type="file"
                className="hidden"
                ref={inputFileRef}
                accept=".json,application/json"
                onChange={() => handleImportFile()}
            />
        </Modal>
    )
}

export default ImportExportModal
