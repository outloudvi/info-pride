import { CharacterIds } from './vendor/characterId'

const EmblemTypes = {
    Various: [
        'big4',
        'guild',
        'faneve_kami',
        'salary_',
        'work',
        'oct',
        'refresh',
        'camera',
        'staff',
        'writer',
        'influencer',
    ],
    MLv: ['manager_'],
    HiscoreLive: ['area_'],
    TowerLevel: ['live_', 'tower_'],
    StoryGroup: ['story_group_', 'story_tsu', 'story_san', 'sp-the-sun-'],
    FanNumber: ['fan_'],
    Score10M: ['score_'],
    Birthday: ['birthday_'],
    Valentine: ['vlnt-'],
    IdolJobLevel: ['job_'],
    April: ['april-'],
    StoryAndRate: [
        CharacterIds.map((x) => x.split('-')[1]).map((x) => `story_${x}`),
        'reliability-',
    ],
    Purchase: ['emb-cd-', 'figure-mna-'],
    VenusLeague: ['league-'],
    PVP: ['sp-pvp-season-001-', 'pvp-season-'],
    GVG: ['gvg-season-'],
    EventResult: ['backside-', 'marathon-', 'contest-', 'race-', 'tour-'],
    Love: ['love'],
    All: ['']
} as const

export default EmblemTypes
