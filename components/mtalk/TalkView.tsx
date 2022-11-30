import { useMemo, useState } from 'react'
import { useLocalStorage } from '@mantine/hooks'

import type { CharacterIdWithManager, CommuLine, EditorPref } from './types'
import Preview from './Preview'
import Compose from './Compose'
import EditorMenu from './EditorMenu'
import ImportModal from './ImportModal'

const TalkView = ({ currChrId }: { currChrId: CharacterIdWithManager }) => {
    const [commuData, setCommuData] = useLocalStorage<CommuLine[]>({
        key: 'mtalk-commu',
        defaultValue: [],
    })
    const [pref, setPref] = useState<EditorPref>({
        editMode: false,
        expandMenu: true,
        importExportModal: false,
    })
    const commuJson = useMemo(
        () => JSON.stringify(commuData, null, 2),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [pref.importExportModal]
    )

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
