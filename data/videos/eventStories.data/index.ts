import en from './en'
import zhHans from './zh-Hans'
import type { EventGroupData, EventStoriesData } from './types'

const _: Record<string, EventStoriesData> = {
    en: en,
    'zh-Hans': zhHans,
}

// This is in Japanese
export const eventGroup: EventGroupData = {
    'st-eve-2107-tour': '遙子',
    'st-eve-2108-tour': '芽衣',
    'st-eve-2109-backside': 'LizNoir',
    'st-eve-2110-marathon': '麻奈',
    'st-eve-2111-backside': '怜',
    'st-eve-2112-marathon': 'TRINITYAiLE',
    'st-eve-2201-contest': 'SUNNY PEACE',
    'st-eve-2202-marathon': 'LizNoir',
    'st-eve-2203-race': '瑠依/雫',
    'st-eve-2204-contest': 'すず',
    'st-eve-2205-race': '千紗/沙季',
    'st-eve-2206-marathon': 'SUNNY PEACE',
    'st-eve-2207-contest': 'ⅢX',
    'st-eve-2208-backside': 'LizNoir',
    'st-eve-2209-contest': 'TRINITYAiLE',
    'st-eve-2210-race': '莉央/琴乃',
    'st-eve-2211-marathon-raid': 'ⅢX',
}

export default _
