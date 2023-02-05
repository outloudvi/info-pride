import { setCookie } from 'cookies-next'

import { USER_PREF_COOKIE_MAXAGE } from './constants'

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

function h_99_migrate_colorScheme_to_cookie() {
    const colorScheme = localStorage.getItem('mantine-color-scheme')
    if (colorScheme === null) return
    setCookie(
        'mantine-color-scheme',
        colorScheme.includes('dark') ? 'dark' : 'light',
        {
            maxAge: USER_PREF_COOKIE_MAXAGE,
        }
    )
    localStorage.removeItem('mantine-color-scheme')
}

async function startupHook() {
    // Migrate localbox to latest version
    h_99_update_localbox()
    // Migrate colorScheme settings from localStorage to cookie
    h_99_migrate_colorScheme_to_cookie()
}
export default startupHook
