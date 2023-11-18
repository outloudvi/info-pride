import { getCookie } from 'cookies-next'
import type { MantineColorScheme } from '@mantine/core'

export const LOCALSTORAGE_BOX_TAG = 'localBox'

function h_99_update_localbox() {
    const UpdateMap = {
        kotono: 'char-ktn',
        nagisa: 'char-ngs',
        saki: 'char-ski',
        suzu: 'char-suz',
        mei: 'char-mei',
        sakura: 'char-skr',
        shizuku: 'char-szk',
        chisa: 'char-chs',
        rei: 'char-rei',
        haruka: 'char-hrk',
        rui: 'char-rui',
        yu: 'char-yu',
        sumire: 'char-smr',
        rio: 'char-rio',
        aoi: 'char-aoi',
        ai: 'char-ai',
        kokoro: 'char-kkr',
        mana: 'char-mna',
    }
    const boxJson = localStorage.getItem(LOCALSTORAGE_BOX_TAG)
    if (boxJson === null) return
    let diff = false
    try {
        const box = JSON.parse(boxJson)
        for (const [k, v] of Object.entries(UpdateMap)) {
            if (box[k]) {
                diff = true
                box[v] = box[k]
                delete box[k]
            }
        }
        localStorage.setItem(LOCALSTORAGE_BOX_TAG, JSON.stringify(box))
        if (diff) {
            console.info('localbox migrated to latest version :D')
        }
    } catch (_) {
        //
    }
}

function h_99_migrate_colorScheme_to_mantine(
    setMantineColorScheme: (s: MantineColorScheme) => void,
) {
    const colorScheme = getCookie('mantine-color-scheme')
    if (colorScheme === 'light' || colorScheme === 'dark') {
        setMantineColorScheme(colorScheme)
    }
}

async function startupHook(
    setMantineColorScheme: (s: MantineColorScheme) => void,
) {
    // Migrate localbox to latest version
    h_99_update_localbox()
    // Migrate colorScheme settings from cookie to MantineProvider
    h_99_migrate_colorScheme_to_mantine(setMantineColorScheme)
}
export default startupHook
