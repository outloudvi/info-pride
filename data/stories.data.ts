import type { SeriesName } from './stories'
import { ChapterItem } from './types'

const data: Partial<
  Record<SeriesName, Record<number, Record<number, ChapterItem>>>
> = {
  // 其它剧情
  Special: {
    1: {
      1: {
        name: '手游开篇剧情',
        video: { type: 'bilibili', vid: 'av761315570' },
      },
      2: {
        name: '[2022/4/1] 愚人节春斗剧情（前篇）',
        video: { type: 'bilibili', vid: 'av980357709', pid: 1 },
      },
      3: {
        name: '[2022/4/1] 愚人节春斗剧情（后篇）',
        video: { type: 'bilibili', vid: 'av980357709', pid: 2 },
      },
      4: {
        name: '[2022/6/30] 三得利售货机限定慰问来电（瑠依）',
        video: { type: 'bilibili', vid: 'av812917702' },
      },
      5: {
        name: '[2022/6/30] 三得利售货机限定慰问来电（堇）',
        video: { type: 'bilibili', vid: 'av813293495' },
      },
      6: {
        name: '[2022/6/30] 三得利售货机限定慰问来电（优）',
        video: { type: 'bilibili', vid: 'av343290005' },
      },
    },
  },
  Hoshimi: {
    1: {
      1: {
        name: '长濑麻奈',
        video: { type: 'bilibili', vid: 'av591604610', pid: 1 },
      },
      2: {
        name: '在那之后的三年',
        video: { type: 'bilibili', vid: 'av591604610', pid: 2 },
      },
      3: {
        name: '长濑琴乃和川咲樱',
        video: { type: 'bilibili', vid: 'av591604610', pid: 3 },
      },
      4: {
        name: '神崎莉央',
        video: { type: 'bilibili', vid: 'av591604610', pid: 4 },
      },
      5: {
        name: '想要单独表演',
        video: { type: 'bilibili', vid: 'av591604610', pid: 5 },
      },
      6: {
        name: '互相吸引的两人',
        video: { type: 'bilibili', vid: 'av591604610', pid: 6 },
      },
      7: {
        name: '新成员是什么样的人呢',
        video: { type: 'bilibili', vid: 'av591604610', pid: 7 },
      },
      8: {
        name: '色彩缤纷的五人',
        video: { type: 'bilibili', vid: 'av591604610', pid: 8 },
      },
      9: {
        name: '经纪人兼宿舍长',
        video: { type: 'bilibili', vid: 'av591604610', pid: 9 },
      },
      10: {
        name: '星见祭典的回忆',
        video: { type: 'bilibili', vid: 'av591604610', pid: 10 },
      },
      11: {
        name: '令人无语的提案',
        video: { type: 'bilibili', vid: 'av591604610', pid: 11 },
      },
      12: {
        name: '严重的失误',
        video: { type: 'bilibili', vid: 'av591604610', pid: 12 },
      },
      13: {
        name: '日与月的物语',
        video: { type: 'bilibili', vid: 'av591604610', pid: 13 },
      },
      14: {
        name: '墙上的女孩',
        video: { type: 'bilibili', vid: 'av591604610', pid: 14 },
      },
      15: {
        name: '奇怪的新成员',
        video: { type: 'bilibili', vid: 'av591604610', pid: 15 },
      },
      16: {
        name: '粉蝶花的花语',
        video: { type: 'bilibili', vid: 'av591604610', pid: 16 },
      },
      17: {
        name: '晴天霹雳',
        video: { type: 'bilibili', vid: 'av591604610', pid: 17 },
      },
      18: {
        name: '突然的来访者',
        video: { type: 'bilibili', vid: 'av591604610', pid: 18 },
      },
      19: {
        name: 'NEXT VENUS大赛',
        video: { type: 'bilibili', vid: 'av591604610', pid: 19 },
      },
      20: {
        name: '心跳的真相',
        video: { type: 'bilibili', vid: 'av591604610', pid: 20 },
      },
      21: {
        name: '对偶像感兴趣吗？',
        video: { type: 'bilibili', vid: 'av591604610', pid: 21 },
      },
      22: {
        name: '不足之处',
        video: { type: 'bilibili', vid: 'av591604610', pid: 22 },
      },
      23: {
        name: '意外的相遇',
        video: { type: 'bilibili', vid: 'av591604610', pid: 23 },
      },
      24: {
        name: '舞蹈比赛优胜者',
        video: { type: 'bilibili', vid: 'av591604610', pid: 24 },
      },
      25: {
        name: '最后一块拼图',
        video: { type: 'bilibili', vid: 'av591604610', pid: 25 },
      },
      26: {
        name: '夜晚、海岸边的街道',
        video: { type: 'bilibili', vid: 'av591604610', pid: 26 },
      },
      27: {
        name: '清晨、商谈着的两人',
        video: { type: 'bilibili', vid: 'av591604610', pid: 27 },
      },
      28: {
        name: '诞生在这个世界瞬间的声音',
        video: { type: 'bilibili', vid: 'av591604610', pid: 28 },
      },
    },
    2: {
      1: {
        name: '以那个高度为目标',
        video: { type: 'bilibili', vid: 'av807206975' },
      },
      2: {
        name: '未填之坑',
        video: { type: 'bilibili', vid: 'av807206975', pid: 2 },
      },
      3: {
        name: '怜的秘密',
        video: { type: 'bilibili', vid: 'av807206975', pid: 3 },
      },
      4: {
        name: '焦急的真相',
        video: { type: 'bilibili', vid: 'av807206975', pid: 4 },
      },
      5: {
        name: '五人一起！',
        video: { type: 'bilibili', vid: 'av807206975', pid: 5 },
      },
      6: {
        name: '偶像知识竞赛王者',
        video: { type: 'bilibili', vid: 'av677428266' },
      },
      7: {
        name: '夜中、卧室里',
        video: { type: 'bilibili', vid: 'av677428266', pid: 2 },
      },
      8: {
        name: '擅长与不擅长',
        video: { type: 'bilibili', vid: 'av677428266', pid: 3 },
      },
      9: {
        name: '两人一起的话、肯定没问题',
        video: { type: 'bilibili', vid: 'av677428266', pid: 4 },
      },
      10: {
        name: '雫与千纱',
        video: { type: 'bilibili', vid: 'av677428266', pid: 5 },
      },
      11: {
        name: '相亲？',
        video: { type: 'bilibili', vid: 'av974586992' },
      },
      12: {
        name: '请容许我拒绝作战',
        video: { type: 'bilibili', vid: 'av974586992', pid: 2 },
      },
      13: {
        name: '来到咖啡店的人',
        video: { type: 'bilibili', vid: 'av974586992', pid: 3 },
      },
      14: {
        name: '遥子烦恼中',
        video: { type: 'bilibili', vid: 'av974586992', pid: 4 },
      },
      15: {
        name: '摇曳心情',
        video: { type: 'bilibili', vid: 'av974586992', pid: 5 },
      },
      16: {
        name: '麻奈的顾虑',
        video: { type: 'bilibili', vid: 'av210396686' },
      },
      17: {
        name: '我的个性',
        video: { type: 'bilibili', vid: 'av210396686', pid: 2 },
      },
      18: {
        name: '渚的真心话',
        video: { type: 'bilibili', vid: 'av210396686', pid: 3 },
      },
      19: {
        name: '是什么风吹来的',
        video: { type: 'bilibili', vid: 'av210396686', pid: 4 },
      },
      20: {
        name: '雾散天晴',
        video: { type: 'bilibili', vid: 'av210396686', pid: 5 },
      },
      21: {
        name: '大小姐的主张',
        video: { type: 'bilibili', vid: 'av723577672' },
      },
      22: {
        name: '钱包空空',
        video: { type: 'bilibili', vid: 'av723577672', pid: 2 },
      },
      23: {
        name: '得知社会的艰辛',
        video: { type: 'bilibili', vid: 'av723577672', pid: 3 },
      },
      24: {
        name: '躲不掉的事',
        video: { type: 'bilibili', vid: 'av723577672', pid: 4 },
      },
      25: {
        name: '新人 top 的建议',
        video: { type: 'bilibili', vid: 'av723577672', pid: 5 },
      },
      26: {
        name: '真的真的真的？',
        video: { type: 'bilibili', vid: 'av381308830' },
      },
      27: {
        name: '尾随开始',
        video: { type: 'bilibili', vid: 'av381308830', pid: 2 },
      },
      28: {
        name: '深夜、小屋里',
        video: { type: 'bilibili', vid: 'av381308830', pid: 3 },
      },
      29: {
        name: '芽衣的真心话',
        video: { type: 'bilibili', vid: 'av381308830', pid: 4 },
      },
      30: {
        name: '指南',
        video: { type: 'bilibili', vid: 'av381308830', pid: 5 },
      },
      31: {
        name: '步伐一致',
        video: { type: 'bilibili', vid: 'av297335586' },
      },
      32: {
        name: '束缚与被束缚',
        video: { type: 'bilibili', vid: 'av297335586', pid: 2 },
      },
      33: {
        name: '参加的两位人选',
        video: { type: 'bilibili', vid: 'av297335586', pid: 3 },
      },
      34: {
        name: '年轻的大前辈',
        video: { type: 'bilibili', vid: 'av297335586', pid: 4 },
      },
      35: {
        name: '些许勇气',
        video: { type: 'bilibili', vid: 'av297335586', pid: 5 },
      },
      36: {
        name: '作为目标之人',
        video: { type: 'bilibili', vid: 'av810555905', pid: 1 },
      },
      37: {
        name: '因为……我是姐姐',
        video: { type: 'bilibili', vid: 'av810555905', pid: 2 },
      },
      38: {
        name: '动人心弦的话语',
        video: { type: 'bilibili', vid: 'av810555905', pid: 3 },
      },
      39: {
        name: '并肩而行',
        video: { type: 'bilibili', vid: 'av810555905', pid: 4 },
      },
      40: {
        name: '冠军候补的一员',
        video: { type: 'bilibili', vid: 'av895912697', pid: 1 },
      },
      41: {
        name: '不寻常的气氛',
        video: { type: 'bilibili', vid: 'av895912697', pid: 2 },
      },
      42: {
        name: '原则、秘密',
        video: { type: 'bilibili', vid: 'av895912697', pid: 3 },
      },
      43: {
        name: '加油 party',
        video: { type: 'bilibili', vid: 'av895912697', pid: 4 },
      },
      44: {
        name: '伴着太阳的光辉',
        video: { type: 'bilibili', vid: 'av895912697', pid: 5 },
      },
      45: {
        name: '紧握月光',
        video: { type: 'bilibili', vid: 'av895912697', pid: 6 },
      },
    },
    3: {
      1: {
        name: '晋级正赛名单公布',
        video: { type: 'bilibili', vid: 'av553118965' },
      },
      2: {
        name: '相似的歌声',
        video: { type: 'bilibili', vid: 'av255681920' },
      },
      3: {
        name: '继承者',
        video: { type: 'bilibili', vid: 'av213315934' },
      },
      4: {
        name: '姐姐所追求的舞台',
        video: { type: 'bilibili', vid: 'av595839983' },
      },
      5: {
        name: '生日的祝福',
        video: { type: 'bilibili', vid: 'av213390008' },
      },
      6: {
        name: '正赛开始',
        video: { type: 'bilibili', vid: 'av938555853' },
      },
      7: {
        name: '在决赛的舞台上',
        video: { type: 'bilibili', vid: 'av298838725' },
      },
      8: {
        name: '苦恼中的琴乃',
        video: { type: 'bilibili', vid: 'av811435993' },
      },
      9: {
        name: '上场的理由',
        video: { type: 'bilibili', vid: 'av684212180' },
      },
      10: {
        name: '以我们的力量',
        video: { type: 'bilibili', vid: 'av511635726' },
      },
      11: {
        name: '强敌现身',
        video: { type: 'bilibili', vid: 'av726774388' },
      },
      12: {
        name: '被人称之为再世',
        video: { type: 'bilibili', vid: 'av257100578' },
      },
      13: {
        name: '真正的我',
        video: { type: 'bilibili', vid: 'av597179964' },
      },
      14: {
        name: '为了自己',
        video: { type: 'bilibili', vid: 'av384773985' },
      },
      15: {
        name: '樱的困惑',
        video: { type: 'bilibili', vid: 'av684780998' },
      },
      16: {
        name: '琴乃的任性',
        video: { type: 'bilibili', vid: 'av512416058' },
      },
      17: {
        name: '麻奈遗留下来的歌',
        video: { type: 'bilibili', vid: 'av684924896' },
      },
      18: {
        name: '悄悄靠近的忧虑',
        video: { type: 'bilibili', vid: 'av214950482' },
      },
      19: {
        name: '不请自来的客人',
        video: { type: 'bilibili', vid: 'av982680518' },
      },
      20: {
        name: '就在那里',
        video: { type: 'bilibili', vid: 'av555161301' },
      },
      21: {
        name: '唱自己的歌',
        video: { type: 'bilibili', vid: 'av427874029' },
      },
      22: {
        name: '我的歌是',
        video: { type: 'bilibili', vid: 'av855364218' },
      },
      23: {
        name: '请让我、去聆听',
        video: { type: 'bilibili', vid: 'av342769749' },
      },
      24: {
        name: '那颗心脏是属于谁的东西',
        video: { type: 'bilibili', vid: 'av512880354' },
      },
      25: {
        name: '为了，这颗心脏',
        video: { type: 'bilibili', vid: 'av385712987' },
      },
    },
  },
  Tokyo: {
    1: {
      1: {
        video: { type: 'bilibili', vid: 'av761361639', pid: 1 },
        name: 'TODO',
      },
      2: {
        video: { type: 'bilibili', vid: 'av761361639', pid: 2 },
        name: 'TODO',
      },
      3: {
        video: { type: 'bilibili', vid: 'av761361639', pid: 3 },
        name: 'TODO',
      },
      4: {
        video: { type: 'bilibili', vid: 'av761361639', pid: 4 },
        name: 'TODO',
      },
      5: {
        video: { type: 'bilibili', vid: 'av761361639', pid: 5 },
        name: 'TODO',
      },
      6: {
        video: { type: 'bilibili', vid: 'av761361639', pid: 6 },
        name: 'TODO',
      },
      7: {
        video: { type: 'bilibili', vid: 'av761361639', pid: 7 },
        name: 'TODO',
      },
      8: {
        video: { type: 'bilibili', vid: 'av761361639', pid: 8 },
        name: 'TODO',
      },
      9: {
        video: { type: 'bilibili', vid: 'av761361639', pid: 9 },
        name: 'TODO',
      },
      10: {
        video: { type: 'bilibili', vid: 'av761361639', pid: 10 },
        name: 'TODO',
      },
      11: {
        video: { type: 'bilibili', vid: 'av761361639', pid: 11 },
        name: 'TODO',
      },
      12: {
        video: { type: 'bilibili', vid: 'av761361639', pid: 12 },
        name: 'TODO',
      },
      13: {
        video: { type: 'bilibili', vid: 'av761361639', pid: 13 },
        name: 'TODO',
      },
      14: {
        video: { type: 'bilibili', vid: 'av761361639', pid: 14 },
        name: 'TODO',
      },
      15: {
        video: { type: 'bilibili', vid: 'av761361639', pid: 15 },
        name: 'TODO',
      },
      16: {
        video: { type: 'bilibili', vid: 'av761361639', pid: 16 },
        name: 'TODO',
      },
      17: {
        video: { type: 'bilibili', vid: 'av761361639', pid: 17 },
        name: 'TODO',
      },
      18: {
        video: { type: 'bilibili', vid: 'av761361639', pid: 18 },
        name: 'TODO',
      },
      19: {
        video: { type: 'bilibili', vid: 'av761361639', pid: 19 },
        name: 'TODO',
      },
      20: {
        video: { type: 'bilibili', vid: 'av761361639', pid: 20 },
        name: 'TODO',
      },
      21: {
        video: { type: 'bilibili', vid: 'av761361639', pid: 21 },
        name: 'TODO',
      },
      22: {
        video: { type: 'bilibili', vid: 'av761361639', pid: 22 },
        name: 'TODO',
      },
      23: {
        video: { type: 'bilibili', vid: 'av761361639', pid: 23 },
        name: 'TODO',
      },
      24: {
        video: { type: 'bilibili', vid: 'av761361639', pid: 24 },
        name: 'TODO',
      },
      25: {
        video: { type: 'bilibili', vid: 'av761361639', pid: 25 },
        name: 'TODO',
      },
    },
    2: {
      1: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 1 },
        name: 'TODO',
      },
      2: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 2 },
        name: 'TODO',
      },
      3: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 3 },
        name: 'TODO',
      },
      4: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 4 },
        name: 'TODO',
      },
      5: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 5 },
        name: 'TODO',
      },
      6: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 6 },
        name: 'TODO',
      },
      7: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 7 },
        name: 'TODO',
      },
      8: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 8 },
        name: 'TODO',
      },
      9: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 9 },
        name: 'TODO',
      },
      10: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 10 },
        name: 'TODO',
      },
      11: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 11 },
        name: 'TODO',
      },
      12: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 12 },
        name: 'TODO',
      },
      13: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 13 },
        name: 'TODO',
      },
      14: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 14 },
        name: 'TODO',
      },
      15: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 15 },
        name: 'TODO',
      },
      16: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 16 },
        name: 'TODO',
      },
      17: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 17 },
        name: 'TODO',
      },
      18: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 18 },
        name: 'TODO',
      },
      19: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 19 },
        name: 'TODO',
      },
      20: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 20 },
        name: 'TODO',
      },
      21: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 21 },
        name: 'TODO',
      },
      22: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 22 },
        name: 'TODO',
      },
      23: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 23 },
        name: 'TODO',
      },
      24: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 24 },
        name: 'TODO',
      },
      25: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 25 },
        name: 'TODO',
      },
      26: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 26 },
        name: 'TODO',
      },
      27: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 27 },
        name: 'TODO',
      },
      28: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 28 },
        name: 'TODO',
      },
      29: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 29 },
        name: 'TODO',
      },
      30: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 30 },
        name: 'TODO',
      },
      31: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 31 },
        name: 'TODO',
      },
      32: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 32 },
        name: 'TODO',
      },
      33: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 33 },
        name: 'TODO',
      },
      34: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 34 },
        name: 'TODO',
      },
      35: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 35 },
        name: 'TODO',
      },
      36: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 36 },
        name: 'TODO',
      },
      37: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 37 },
        name: 'TODO',
      },
      38: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 38 },
        name: 'TODO',
      },
      39: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 39 },
        name: 'TODO',
      },
      40: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 40 },
        name: 'TODO',
      },
      41: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 41 },
        name: 'TODO',
      },
      42: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 42 },
        name: 'TODO',
      },
      43: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 43 },
        name: 'TODO',
      },
      44: {
        video: { type: 'bilibili', vid: 'av632285757', pid: 44 },
        name: 'TODO',
      },
    },
  },
  TRINITYAiLE: {
    1: {
      1: {
        name: '绝对的偶像',
        video: { type: 'bilibili', vid: 'av804196981', pid: 1 },
      },
      2: {
        name: '想变得擅长',
        video: { type: 'bilibili', vid: 'av804196981', pid: 2 },
      },
      3: {
        name: '相遇的二人',
        video: { type: 'bilibili', vid: 'av804196981', pid: 3 },
      },
      4: {
        name: '背后的决心',
        video: { type: 'bilibili', vid: 'av804196981', pid: 4 },
      },
      5: {
        name: '一同的目标',
        video: { type: 'bilibili', vid: 'av804196981', pid: 5 },
      },
      6: {
        name: '发现加油者',
        video: { type: 'bilibili', vid: 'av804196981', pid: 6 },
      },
      7: {
        name: '新组合诞生',
        video: { type: 'bilibili', vid: 'av804196981', pid: 7 },
      },
      8: {
        name: '超越长濑麻奈',
        video: { type: 'bilibili', vid: 'av804196981', pid: 8 },
      },
      9: {
        name: '坚强的伙伴',
        video: { type: 'bilibili', vid: 'av804196981', pid: 9 },
      },
      10: {
        name: '面向大奖赛',
        video: { type: 'bilibili', vid: 'av804196981', pid: 10 },
      },
      11: {
        name: '心情迷路',
        video: { type: 'bilibili', vid: 'av591800072' },
      },
      12: {
        name: '不满意的对阵',
        video: { type: 'bilibili', vid: 'av209755775' },
      },
      13: {
        name: '接受并面对',
        video: { type: 'bilibili', vid: 'av765030318' },
      },
      14: {
        name: '证明真心',
        video: { type: 'bilibili', vid: 'av422599076' },
      },
      15: {
        name: '真实的优',
        video: { type: 'bilibili', vid: 'av765427859' },
      },
      16: {
        name: '可能没什么精神',
        video: { type: 'bilibili', vid: 'av253020879' },
      },
      17: {
        name: '最终预选赛前的纠纷',
        video: { type: 'bilibili', vid: 'av508735117' },
      },
      18: {
        name: '三个人的 TRIAiLE',
        video: { type: 'bilibili', vid: 'av936200996' },
      },
      19: {
        name: '都能振翅高飞',
        video: { type: 'bilibili', vid: 'av338962895' },
      },
      20: {
        name: '大奖赛结束了',
        video: { type: 'bilibili', vid: 'av766715119' },
      },
      21: {
        name: '新的开始',
        video: { type: 'bilibili', vid: 'av980281288' },
      },
      22: {
        name: '我们是姐妹',
        video: { type: 'bilibili', vid: 'av980429923' },
      },
      23: {
        name: '堇的梦想',
        video: { type: 'bilibili', vid: 'av638116460' },
      },
      24: {
        name: '重大的决断',
        video: { type: 'bilibili', vid: 'av213686714' },
      },
      25: {
        name: '绝不让步的想法',
        video: { type: 'bilibili', vid: 'av683948490' },
      },
      26: {
        name: '家人的心情',
        video: { type: 'bilibili', vid: 'av726905405' },
      },
      27: {
        name: '全部都要！',
        video: { type: 'bilibili', vid: 'av554538436' },
      },
      28: {
        name: '为了朋友',
        video: { type: 'bilibili', vid: 'av639941313' },
      },
      29: {
        name: '梦的共演',
        video: { type: 'bilibili', vid: 'av940346740' },
      },
      30: {
        name: '兄妹的约定',
        video: { type: 'bilibili', vid: 'av215267335' },
      },
    },
  },
  LizNoir: {
    1: {
      1: {
        name: '莉央的开始',
        video: { type: 'bilibili', vid: 'av974411463' },
      },
      2: {
        name: '最后一人',
        video: { type: 'bilibili', vid: 'av759463610' },
      },
      3: {
        name: '天生的舞蹈家',
        video: { type: 'bilibili', vid: 'av419542839' },
      },
      4: {
        name: '忘记一切',
        video: { type: 'bilibili', vid: 'av804628389' },
      },
      5: {
        name: '三枝的决心',
        video: { type: 'bilibili', vid: 'av334855535' },
      },
      6: {
        name: '长濑麻奈的登场',
        video: { type: 'bilibili', vid: 'av632506420' },
      },
      7: {
        name: '堂堂正正战斗',
        video: { type: 'bilibili', vid: 'av377650772' },
      },
      8: {
        name: '第一次的挫折',
        video: { type: 'bilibili', vid: 'av717726964' },
      },
      9: {
        name: '不说再见',
        video: { type: 'bilibili', vid: 'av462869439' },
      },
      10: {
        name: '时隔一年的LIVE',
        video: { type: 'bilibili', vid: 'av720376376' },
      },
      11: {
        name: 'BIG4的威严',
        video: { type: 'bilibili', vid: 'av208123626' },
      },
      12: {
        name: '姬野的方针',
        video: { type: 'bilibili', vid: 'av805653353' },
      },
      13: {
        name: '做这个世界上最棒的',
        video: { type: 'bilibili', vid: 'av505829791' },
      },
      14: {
        name: '如果没能夺冠的话',
        video: { type: 'bilibili', vid: 'av633484590' },
      },
      15: {
        name: '偶尔休息一下',
        video: { type: 'bilibili', vid: 'av590883688' },
      },
      16: {
        name: '在走廊上奔跑的新人',
        video: { type: 'bilibili', vid: 'av421032915' },
      },
      17: {
        name: '只有这次是特别的',
        video: { type: 'bilibili', vid: 'av763654783' },
      },
      18: {
        name: '莉央亲手做的料理',
        video: { type: 'bilibili', vid: 'av293778360' },
      },
      19: {
        name: '半决赛前一天',
        video: { type: 'bilibili', vid: 'av293856588' },
      },
      20: {
        name: '心情变得如此舒畅',
        video: { type: 'bilibili', vid: 'av336380361' },
      },
      21: {
        name: '解散的决断',
        video: { type: 'bilibili', vid: 'av211607264' },
      },
      22: {
        name: '迫近的时限',
        video: { type: 'bilibili', vid: 'av297715784' },
      },
      23: {
        name: '导火索',
        video: { type: 'bilibili', vid: 'av467720270' },
      },
      24: {
        name: '把笑容化作武器',
        video: { type: 'bilibili', vid: 'av510297646' },
      },
      25: {
        name: '最后的特训',
        video: { type: 'bilibili', vid: 'av937943942' },
      },
      26: {
        name: '进入新世界',
        video: { type: 'bilibili', vid: 'av853118491' },
      },
      27: {
        name: '一片空白的日程表',
        video: { type: 'bilibili', vid: 'av683139949' },
      },
      28: {
        name: '世界之墙',
        video: { type: 'bilibili', vid: 'av896031365' },
      },
      29: {
        name: '后辈的想法',
        video: { type: 'bilibili', vid: 'av642765842' },
      },
      30: {
        name: '通往顶点的序曲',
        video: { type: 'bilibili', vid: 'av301175777' },
      },
    },
  },
  Mana: {
    1: {
      1: {
        name: 'TODO',
        video: {
          type: 'bilibili',
          vid: 'av419302445',
          pid: 1,
        },
      },
      2: {
        name: 'TODO',
        video: {
          type: 'bilibili',
          vid: 'av419302445',
          pid: 2,
        },
      },
      3: {
        name: 'TODO',
        video: {
          type: 'bilibili',
          vid: 'av419302445',
          pid: 3,
        },
      },
      4: {
        name: 'TODO',
        video: {
          type: 'bilibili',
          vid: 'av419302445',
          pid: 4,
        },
      },
      5: {
        name: 'TODO',
        video: {
          type: 'bilibili',
          vid: 'av419302445',
          pid: 5,
        },
      },
      6: {
        name: 'TODO',
        video: {
          type: 'bilibili',
          vid: 'av419302445',
          pid: 6,
        },
      },
      7: {
        name: 'TODO',
        video: {
          type: 'bilibili',
          vid: 'av419302445',
          pid: 7,
        },
      },
      8: {
        name: 'TODO',
        video: {
          type: 'bilibili',
          vid: 'av419302445',
          pid: 8,
        },
      },
      9: {
        name: 'TODO',
        video: {
          type: 'bilibili',
          vid: 'av419302445',
          pid: 9,
        },
      },
      10: {
        name: 'TODO',
        video: {
          type: 'bilibili',
          vid: 'av419302445',
          pid: 10,
        },
      },
      11: {
        name: 'TODO',
        video: {
          type: 'bilibili',
          vid: 'av419302445',
          pid: 11,
        },
      },
      12: {
        name: 'TODO',
        video: {
          type: 'bilibili',
          vid: 'av419302445',
          pid: 12,
        },
      },
      13: {
        name: 'TODO',
        video: {
          type: 'bilibili',
          vid: 'av419302445',
          pid: 13,
        },
      },
      14: {
        name: 'TODO',
        video: {
          type: 'bilibili',
          vid: 'av419302445',
          pid: 14,
        },
      },
      15: {
        name: 'TODO',
        video: {
          type: 'bilibili',
          vid: 'av419302445',
          pid: 15,
        },
      },
    },
  },
  ThreeX: {
    1: {
      1: {
        name: 'ⅢⅩ的从零开始的物语',
        video: { type: 'bilibili', vid: 'av385022619' },
      },
      2: {
        name: '像魔法少女一样',
        video: { type: 'bilibili', vid: 'av257513188' },
      },
      3: {
        name: '偶像只不过是人生中的一个小插曲而已',
        video: { type: 'bilibili', vid: 'av685217154' },
      },
      4: {
        name: '团队的队长',
        video: { type: 'bilibili', vid: 'av643013020' },
      },
      5: {
        name: '为胜而赢',
        video: { type: 'bilibili', vid: 'av686107541' },
      },
    },
  },
  Big4: {
    1: {
      1: {
        name: '再会',
        video: { type: 'bilibili', vid: 'av770256819' },
      },
    },
  },
    Tsuki: {
        1: {
            1: {
                name: 'TODO',
                video: { type: 'bilibili', vid: 'av217282190' },
            },
            2: {
                name: 'TODO',
                video: { type: 'bilibili', vid: 'av514854241' },
            },
        },
    },
}

export default data
