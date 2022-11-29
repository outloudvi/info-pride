import { useState } from 'react'

import type { CharacterIdWithManager, CommuLine, EditorPref } from './types'
import Preview from './Preview'
import Compose from './Compose'
import EditorMenu from './EditorMenu'

const TalkView = ({ currChrId }: { currChrId: CharacterIdWithManager }) => {
    const [commuData, setCommuData] = useState<CommuLine[]>([
        {
            characterId: 'char-aoi',
            text: '人には向き不向きがある',
        },
        {
            text: '相変わらず仲がいいな',
            characterId: '',
        },
        {
            text: 'みんなはどんな反応を？',
            characterId: '',
        },
        {
            characterId: 'char-aoi',
            text: '番組を観た後',
        },
    ])
    const [pref, setPref] = useState<EditorPref>({
        editMode: false,
        expandMenu: false,
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
