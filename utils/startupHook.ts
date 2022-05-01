import * as Sentry from '@sentry/browser'

import { CharacterChineseNameList } from '../data/vendor/characterId'
import { LOCALSTORAGE_BOX_TAG } from '../pages/settings'

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
      Sentry.captureMessage('localbox migrated to latest version')
    }
  } catch (_) {
    //
  }
}

async function startupHook() {
  // Migrate localbox to latest version
  h_99_update_localbox()
}
export default startupHook
