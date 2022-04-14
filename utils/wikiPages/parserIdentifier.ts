export interface Ident {
  type: string
}

export type MatchQuery = string | RegExp

export type Matcher = {
  spec: (MatchQuery | [string, MatchQuery[]])[]
  body: (r: Record<string, string>) => Ident
}

const __RGB = ['红', '绿', '蓝']
const __WHO = [
  '自身',
  '自己',
  '相邻角色',
  /(?<on>中心(位置)?角色)/,
  '全员',
  '谁',
  /(?<color1>[红黄蓝])属性最?高的?(?<num>\d+)人/,
  /对象(?<num>\d+)人/,
  /得分角色(?<num>\d+)人/,
]

const __PROPS = ['剩余体力多', '粉丝核心率多', '剩余体力少', '观众数量少']

const __STATUSES = [
  '隐身',
  '集目',
  '不调',
  '气氛高昂',
  '节拍得分',
  '得分提升',
  '暴击系数提升',
  '暴击率提升',
  '体力消耗提升',
  '技能成功率提升',
  'A技能得分提升',
  '红属性提升',
  '黄属性提升',
  '黄属性降低',
  '蓝属性提升',
  '体力消耗降低',
  '连击得分提升',
  '连击接续',
]

export const Matchers: Matcher[] = [
  // Condition
  {
    spec: [/^每节拍$/],
    body: () => ({
      type: 'when',
      when: {
        every: 'beat',
      },
    }),
  },
  {
    spec: [/谁的?/, ['typ', [/(sp)/i, /(a)/i]], /发动之?前/],
    body: ({ typ }) => ({
      type: 'when',
      when: {
        before: typ.toUpperCase(),
      },
    }),
  },
  {
    spec: ['当', ['on', __WHO], ['s', __STATUSES], '状态时'],
    body: ({ s, on }) => ({
      type: 'when',
      when: {
        on,
        status: s,
      },
    }),
  },
  {
    spec: ['当', ['on', __WHO], ['prop', ['体力']], ['s', [/(\d+)/]], '以下时'],
    body: ({ s, on, prop }) => ({
      type: 'when',
      when: {
        on,
        prop,
        value: {
          $lt: Number(s),
        },
      },
    }),
  },
  {
    spec: ['当', ['on', __WHO], ['prop', ['体力']], ['s', [/(\d+)/]], '以上时'],
    body: ({ s, on, prop }) => ({
      type: 'when',
      when: {
        on,
        prop,
        value: {
          $gt: Number(s),
        },
      },
    }),
  },
  {
    spec: ['当', ['on', __WHO], ['prop', ['体力']], '高于', ['s', [/(\d+)/]]],
    body: ({ s, on, prop }) => ({
      type: 'when',
      when: {
        on,
        prop,
        value: {
          $gt: Number(s),
        },
      },
    }),
  },
  {
    spec: ['当', ['on', __WHO], ['prop', ['体力']], '低于', ['s', [/(\d+)/]]],
    body: ({ s, on, prop }) => ({
      type: 'when',
      when: {
        on,
        prop,
        value: {
          $lt: Number(s),
        },
      },
    }),
  },
  {
    spec: ['自己暴击时'],
    body: () => ({
      type: 'when',
      when: {
        critical: { $eq: true },
        on: 'self',
      },
    }),
  },
  {
    spec: [/^暴击时$/],
    body: () => ({
      type: 'when',
      when: {
        critical: { $eq: true },
      },
    }),
  },
  {
    spec: ['自己处于', ['color', __RGB]],
    body: ({ color }) => ({
      type: 'when',
      when: {
        track: { $eq: color },
      },
    }),
  },
  {
    spec: ['连击', /以上|高于/, ['s', [/(\d+)/]]],
    body: ({ s }) => ({
      type: 'when',
      when: {
        combo: { $gt: Number(s) },
      },
    }),
  },
  {
    spec: [['s', [/(\d+)/]], '连击', /以上|高于/],
    body: ({ s }) => ({
      type: 'when',
      when: {
        combo: { $gt: Number(s) },
      },
    }),
  },
  // Effect
  {
    spec: [['prob', [/(\d+)%/]], '概率', ['s', [/(\d+)%/]], '得分'],
    body: ({ prob, s }) => ({
      type: 'scoreMultiplier',
      scoreMultiplyPerc: Number(s),
      probabilityPerc: Number(prob),
    }),
  },
  {
    spec: [['s', [/(\d+)[％%]/]], /得分|分数/, '取得'],
    body: ({ s }) => ({
      type: 'scoreMultiplier',
      scoreMultiplyPerc: Number(s),
    }),
  },
  {
    spec: ['取得', /得分|分数/, ['s', [/(\d+)[％%]/]]],
    body: ({ s }) => ({
      type: 'scoreMultiplier',
      scoreMultiplyPerc: Number(s),
    }),
  },
  {
    spec: ['取得', ['s', [/(\d+)[％%]/]], /得分|分数/],
    body: ({ s }) => ({
      type: 'scoreMultiplier',
      scoreMultiplyPerc: Number(s),
    }),
  },
  {
    spec: ['スタミナ:', ['s', [/(\d+)/]]],
    body: ({ s }) => ({
      type: 'staminaCost',
      staminaCost: Number(s),
    }),
  },
  {
    spec: ['体力消耗', ['s', [/(\d+)/]]],
    body: ({ s }) => ({
      type: 'staminaCost',
      staminaCost: Number(s),
    }),
  },
  {
    spec: [['on', __WHO], 'CT', '减少', ['s', [/(\d+)/]]],
    body: ({ s, on }) => ({
      type: 'ctDecrease',
      ctDecrease: {
        number: Number(s),
        on,
      },
    }),
  },
  {
    spec: [['on', __WHO], '体力回复', ['s', [/(\d+)/]]],
    body: ({ s, on }) => ({
      type: 'staminaUp',
      staminaUp: {
        number: Number(s),
        on,
      },
    }),
  },
  {
    spec: [['s', [/CT[:：](\d+)/]]],
    body: ({ s }) => ({
      type: 'colddownTime',
      colddownTime: Number(s),
    }),
  },
  {
    spec: ['赋予', ['on', __WHO], ['s', [/(\d+)层/]], ['color', __RGB], '提升'],
    body: ({ s, color, on }) => ({
      type: 'statusUp',
      statusUp: {
        on,
        level: Number(s),
        color,
      },
    }),
  },
  {
    spec: ['赋予', ['on', __WHO], ['s', [/(\d+)层/]], ['status', __STATUSES]],
    body: ({ s, status, on }) => ({
      type: 'statusUp',
      statusUp: {
        on,
        status,
        level: Number(s),
      },
    }),
  },
  {
    spec: ['赋予', ['on', __WHO], ['status', __STATUSES]],
    body: ({ status, on }) => ({
      type: 'statisGive',
      statusGive: {
        on,
        status,
      },
    }),
  },
  {
    spec: [['prop', __PROPS], '得分提升'],
    body: ({ prop }) => ({
      type: 'scoreUpAt',
      scoreUpAt: {
        propPriority: prop,
      },
    }),
  },
  {
    spec: [/^连击数得分提升$/],
    body: () => ({
      type: 'comboScoreUp',
    }),
  },
  // Limit
  {
    spec: ['一局仅发动一次'],
    body: () => ({
      type: 'limit',
      limit: 'once',
    }),
  },
  {
    spec: [['l', [/^\[(\d+)拍\]$/]]],
    body: ({ l }) => ({
      type: 'limitLength',
      limitLength: Number(l),
    }),
  },
]
