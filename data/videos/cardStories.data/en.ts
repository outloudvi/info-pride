import type { StoriesData } from './types'

// ---- Tsuki no Tempest ----
const dataKotono: StoriesData = {}

const dataNagisa: StoriesData = {}

const dataSaki: StoriesData = {}

const dataSuzu: StoriesData = {}

const dataMei: StoriesData = {}

// ---- SUNNY PEACE ----
const dataSakura: StoriesData = {}

const dataShizuku: StoriesData = {}

const dataChisa: StoriesData = {}

const dataRei: StoriesData = {}

const dataHaruka: StoriesData = {}

// ---- TRINITYAiLE ----
const dataRui: StoriesData = {}

const dataYu: StoriesData = {}

const dataSumire: StoriesData = {}

// ---- LizNoir ----
const dataRio: StoriesData = {}

const dataAoi: StoriesData = {}

const dataAi: StoriesData = {}

const dataKokoro: StoriesData = {}

// ---- 3X ----
const dataFran: StoriesData = {}

const dataKana: StoriesData = {}

const dataMiho: StoriesData = {}

// ---- Personal Idols ----
// Mana
const dataMana: StoriesData = {
    // Premium cards do NOT have stories
    'card-mna-05-prem-00': null,
}

const dataMikuCollab: StoriesData = {}

const data: StoriesData = {
    ...dataKotono,
    ...dataNagisa,
    ...dataSaki,
    ...dataSuzu,
    ...dataMei,

    ...dataSakura,
    ...dataShizuku,
    ...dataChisa,
    ...dataRei,
    ...dataHaruka,

    ...dataRui,
    ...dataYu,
    ...dataSumire,
    ...dataAi,

    ...dataRio,
    ...dataAoi,
    ...dataKokoro,

    ...dataMana,

    ...dataFran,
    ...dataKana,
    ...dataMiho,

    ...dataMikuCollab,
}

export default data