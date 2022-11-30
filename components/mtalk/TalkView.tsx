import { useState } from 'react'
import { useLocalStorage } from '@mantine/hooks'

import type { CharacterIdWithManager, CommuLine, EditorPref } from './types'
import Preview from './Preview'
import Compose from './Compose'
import EditorMenu from './EditorMenu'

const TalkView = ({ currChrId }: { currChrId: CharacterIdWithManager }) => {
    const [commuData, setCommuData] = useLocalStorage<CommuLine[]>({
        key: 'mtalk-commu',
        defaultValue: [],
    })
    const [pref, setPref] = useState<EditorPref>({
        editMode: false,
        expandMenu: true,
    })

    return (
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
            <div className={`bg-blue-500 ${!pref.expandMenu ? 'hidden' : ''}`}>
                <EditorMenu setPref={setPref} />
            </div>
        </div>
    )
}

export default TalkView
