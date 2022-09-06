import { ChapterItem } from './types'

const data: Record<string, ChapterItem> = {
    // 雨上がりの太陽と共に
    'st-eve-2107-tour-001': {
        name: '遥子的烦恼',
        video: { type: 'bilibili', vid: 'av546998587', pid: 1 },
    },
    'st-eve-2107-tour-002': {
        name: '厄运',
        video: { type: 'bilibili', vid: 'av546998587', pid: 2 },
    },
    'st-eve-2107-tour-003': {
        name: '雫的妙招',
        video: { type: 'bilibili', vid: 'av546998587', pid: 3 },
    },
    'st-eve-2107-tour-004': {
        name: '冲绳的太阳',
        video: { type: 'bilibili', vid: 'av546998587', pid: 4 },
    },
    'st-eve-2107-tour-005': {
        name: '最棒的夏天',
        video: { type: 'bilibili', vid: 'av546998587', pid: 5 },
    },
    // 月夜に輝く恋の魔法
    'st-eve-2108-tour-001': {
        name: '偷听？',
        video: { type: 'bilibili', vid: 'av674543909', pid: 1 },
    },
    'st-eve-2108-tour-002': {
        name: '夏天的新曲',
        video: { type: 'bilibili', vid: 'av674543909', pid: 2 },
    },
    'st-eve-2108-tour-003': {
        name: '月光风暴的夏天',
        video: { type: 'bilibili', vid: 'av674543909', pid: 3 },
    },
    'st-eve-2108-tour-004': {
        name: '花火大会的传说',
        video: { type: 'bilibili', vid: 'av674543909', pid: 4 },
    },
    'st-eve-2108-tour-005': {
        name: '芽衣的恋情',
        video: { type: 'bilibili', vid: 'av674543909', pid: 5 },
    },
    // 芽吹く黒ユリの蕾
    'st-eve-2109-backside-001': {
        name: 'LizNoir 失格',
        video: { type: 'bilibili', vid: 'av847862972', pid: 1 },
    },
    'st-eve-2109-backside-002': {
        name: '我不行',
        video: { type: 'bilibili', vid: 'av847862972', pid: 2 },
    },
    'st-eve-2109-backside-003': {
        name: '合宿开始',
        video: { type: 'bilibili', vid: 'av847862972', pid: 3 },
    },
    'st-eve-2109-backside-004': {
        name: '莉央的本意',
        video: { type: 'bilibili', vid: 'av847862972', pid: 4 },
    },
    'st-eve-2109-backside-005': {
        name: 'The Last Chance',
        video: { type: 'bilibili', vid: 'av847862972', pid: 5 },
    },
    // 煌めく奇跡をもう一度
    'st-eve-2110-marathon-001': {
        name: '生日前夜',
        video: { type: 'bilibili', vid: 'av592942625' },
    },
    'st-eve-2110-marathon-002': {
        name: '去星见市',
        video: { type: 'bilibili', vid: 'av380466410' },
    },
    'st-eve-2110-marathon-003': {
        name: '强烈的回忆',
        video: { type: 'bilibili', vid: 'av465515929' },
    },
    'st-eve-2110-marathon-004': {
        name: '演唱会的准备',
        video: { type: 'bilibili', vid: 'av635579084' },
    },
    'st-eve-2110-marathon-005': {
        name: '生日特典演唱会',
        video: { type: 'bilibili', vid: 'av935527369' },
    },
    'st-eve-2110-marathon-006': {
        name: '宴会结束',
        video: { type: 'bilibili', vid: 'av893228144' },
    },
    // 夢踊るステージに架け橋を
    'st-eve-2111-backside-001': {
        name: '家庭的存在',
        video: { type: 'bilibili', vid: 'av891440042', pid: 1 },
    },
    'st-eve-2111-backside-002': {
        name: '突击！',
        video: { type: 'bilibili', vid: 'av891440042', pid: 2 },
    },
    'st-eve-2111-backside-003': {
        name: '托付的感情',
        video: { type: 'bilibili', vid: 'av891440042', pid: 3 },
    },
    'st-eve-2111-backside-004': {
        name: '但是，偶像',
        video: { type: 'bilibili', vid: 'av891440042', pid: 4 },
    },
    'st-eve-2111-backside-005': {
        name: '来自你的女儿',
        video: { type: 'bilibili', vid: 'av891440042', pid: 5 },
    },
    // 羽休む聖夜のサプライズ
    'st-eve-2112-marathon-001': {
        name: '度过圣诞节的方法',
        video: { type: 'bilibili', vid: 'av507120283', pid: 1 },
    },
    'st-eve-2112-marathon-002': {
        name: '秘密的计划',
        video: { type: 'bilibili', vid: 'av507120283', pid: 1 },
    },
    'st-eve-2112-marathon-003': {
        name: '藏在心中的寂寞',
        video: { type: 'bilibili', vid: 'av507120283', pid: 1 },
    },
    'st-eve-2112-marathon-004': {
        name: 'lumière',
        video: { type: 'bilibili', vid: 'av507120283', pid: 1 },
    },
    'st-eve-2112-marathon-005': {
        name: '三个圣诞老人',
        video: { type: 'bilibili', vid: 'av507120283', pid: 1 },
    },
    // 昇る初陽に咲く笑顔
    'st-eve-2201-contest-001': {
        name: '报恩的惊喜',
        video: { type: 'bilibili', vid: 'av507895635' },
    },
    'st-eve-2201-contest-002': {
        name: '全力绝对倒计时',
        video: { type: 'bilibili', vid: 'av893029384' },
    },
    'st-eve-2201-contest-003': {
        name: 'SUNNY PEACE 的正月',
        video: { type: 'bilibili', vid: 'av295835603' },
    },
    'st-eve-2201-contest-004': {
        name: '川咲家的款待',
        video: { type: 'bilibili', vid: 'av550988028' },
    },
    'st-eve-2201-contest-005': {
        name: '如同初升朝阳般',
        video: { type: 'bilibili', vid: 'av296063778' },
    },
    // 心愛溶けるビターチョコレート
    // 《Darkness Sympathizer》！
    'st-eve-2202-marathon-001': {
        name: '那日的真相',
        video: { type: 'bilibili', vid: 'av508625522' },
    },
    'st-eve-2202-marathon-002': {
        name: '奋斗的嘉奖',
        video: { type: 'bilibili', vid: 'av936648263' },
    },
    'st-eve-2202-marathon-003': {
        name: '不甘的现实',
        video: { type: 'bilibili', vid: 'av766757843' },
    },
    'st-eve-2202-marathon-004': {
        name: '向未来进发',
        video: { type: 'bilibili', vid: 'av254560169' },
    },
    'st-eve-2202-marathon-005': {
        name: 'LizNoir 的情人节',
        video: { type: 'bilibili', vid: 'av552276368' },
    },
    // 並び立つ歌姫のフルリール
    'st-eve-2203-race-001': {
        name: '憧憬的那个姿态',
        video: { type: 'bilibili', vid: 'av852054230', pid: 1 },
    },
    'st-eve-2203-race-002': {
        name: '隐秘的才能',
        video: { type: 'bilibili', vid: 'av852054230', pid: 2 },
    },
    'st-eve-2203-race-003': {
        name: '正反相对的二人',
        video: { type: 'bilibili', vid: 'av852054230', pid: 3 },
    },
    'st-eve-2203-race-004': {
        name: '请交给我……！',
        video: { type: 'bilibili', vid: 'av852054230', pid: 4 },
    },
    'st-eve-2203-race-005': {
        name: '用我们的方式',
        video: { type: 'bilibili', vid: 'av852054230', pid: 5 },
    },
    'st-eve-2203-race-006': {
        name: '番红花之扉',
        video: { type: 'bilibili', vid: 'av852054230', pid: 6 },
    },
    // 愛歌う星の継承者
    'st-eve-2204-contest-001': {
        name: '最喜欢的歌',
        video: { type: 'bilibili', vid: 'av895135975' },
    },
    'st-eve-2204-contest-002': {
        name: '越听越是觉得',
        video: { type: 'bilibili', vid: 'av467711177' },
    },
    'st-eve-2204-contest-003': {
        name: '突如其来的爱情',
        video: { type: 'bilibili', vid: 'av937794638' },
    },
    'st-eve-2204-contest-004': {
        name: '禁断的恋爱',
        video: { type: 'bilibili', vid: 'av552861465' },
    },
    'st-eve-2204-contest-005': {
        name: '敌不过的对手',
        video: { type: 'bilibili', vid: 'av425382743' },
    },
    'st-eve-2204-contest-006': {
        name: 'Precious',
        video: { type: 'bilibili', vid: 'av895452933' },
    },
    // 心紡ぎ合う輝きの競演
    'st-eve-2205-race-001': {
        name: '期间限定的姐妹队伍',
        video: { type: 'bilibili', vid: 'av213708474' },
    },
    'st-eve-2205-race-002': {
        name: '这样下去是不行的',
        video: { type: 'bilibili', vid: 'av981340484' },
    },
    'st-eve-2205-race-003': {
        name: '后悔什么的，我才不想！',
        video: { type: 'bilibili', vid: 'av383976607' },
    },
    'st-eve-2205-race-004': {
        name: '真正想做的事情',
        video: { type: 'bilibili', vid: 'av553893907' },
    },
    'st-eve-2205-race-005': {
        name: '只要是我们的话，就没有问题',
        video: { type: 'bilibili', vid: 'av553882116' },
    },
    'st-eve-2208-backside-001': {
        name: '想和前辈一起玩',
        video: { type: 'bilibili', vid: 'av301706967' },
    },
    'st-eve-2208-backside-002': {
        name: '没有什么比得上夏天',
        video: { type: 'bilibili', vid: 'av984150422' },
    },
    'st-eve-2208-backside-003': {
        name: '海蓝色的忧郁',
        video: { type: 'bilibili', vid: 'av429131742' },
    },
    'st-eve-2208-backside-004': {
        name: '搭讪的处理方法',
        video: { type: 'bilibili', vid: '686632759' },
    },
    'st-eve-2208-backside-005': {
        name: '比夏天更炎热的恋爱体验',
        video: { type: 'bilibili', vid: 'av344304719' },
    },
    'st-eve-2209-contest-001': {
        name: '虚拟歌手',
        video: { type: 'bilibili', vid: 'av260183330' },
    },
    'st-eve-2209-contest-002': {
        name: '初音的纪念日',
        video: { type: 'bilibili', vid: 'av772740283' },
    },
    'st-eve-2209-contest-003': {
        name: '真实的想法',
        video: { type: 'bilibili', vid: 'av942670175' },
    },
    'st-eve-2209-contest-004': {
        name: '初次的握手会',
        video: { type: 'bilibili', vid: 'av900132399' },
    },
    'st-eve-2209-contest-005': {
        name: 'with. 初音未来',
        video: { type: 'bilibili', vid: 'av857781292' },
    },
}

export const EventGroupData: Record<string, string> = {
    'st-eve-2107-tour': '遥子',
    'st-eve-2108-tour': '芽衣',
    'st-eve-2109-backside': 'LizNoir',
    'st-eve-2110-marathon': '麻奈',
    'st-eve-2111-backside': '怜',
    'st-eve-2112-marathon': 'TRINITYAiLE',
    'st-eve-2201-contest': 'SUNNY PEACE',
    'st-eve-2202-marathon': 'LizNoir',
    'st-eve-2203-race': '瑠依/雫',
    'st-eve-2204-contest': '铃',
    'st-eve-2205-race': '千纱/沙季',
    'st-eve-2206-marathon': 'SUNNY PEACE',
    'st-eve-2207-contest': 'ⅢX',
    'st-eve-2208-backside': 'LizNoir',
}

export default data
