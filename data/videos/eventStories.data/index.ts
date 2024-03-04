import en from './en'
import zhHans from './zh-Hans'
import ko from './ko'
import type { EventGroupData, EventStoriesData } from './types'

const _: Record<string, EventStoriesData> = {
    en: en,
    'zh-Hans': zhHans,
    ko: ko,
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
    'st-eve-2212-race': '月スト',
    'st-eve-2301-contest': 'LizNoir',
    'st-eve-2302-marathon-raid': 'TRINITYAiLE',
    'st-eve-2303-race': 'ぱじゃパ！',
    'st-eve-2304-marathon-raid': '琴乃',
    'st-eve-2305-race': 'けいおん！',
    'st-eve-2306-contest': '遙子',
    'st-eve-2307-race': 'ⅢX',
    'st-eve-2308-marathon-raid': '優',
    'st-eve-2309-backside': '怜/遙子',
    'st-eve-2310-race': '芽衣/すず',
    'st-eve-2311-marathon-raid': 'TRINITYAiLE',
    'st-eve-2312-contest': 'Aqours!',
    'st-eve-2401-race': '猫',
    'st-eve-2402-contest': '雪ミク',
    'st-eve-2403-race': 'SUNNY PEACE',
}

export default _
