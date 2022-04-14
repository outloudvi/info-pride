import { Matcher, PropertySimple, StatusSimple } from './types.js'

const __RGB = ['红', '黄', '蓝']
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

const Props = {
  体力: PropertySimple.Stamina,
} as const

const __PROPS = Object.keys(Props)

const __PROP_STATS = ['剩余体力多', '粉丝核心率多', '剩余体力少', '观众数量少']

const Statuses = {
  隐身: StatusSimple.Invisible,
  集目: StatusSimple.Focused,
  不调: StatusSimple.BadCond,
  气氛高昂: StatusSimple.HighSpirits,
  节拍得分: StatusSimple.BeatScoring,
  得分提升: StatusSimple.ScoringUp,
  暴击系数提升: StatusSimple.CritCoefUp,
  暴击率提升: StatusSimple.CritRateUp,
  体力消耗提升: StatusSimple.StamDraiUp,
  体力消耗降低: StatusSimple.StamDraiDn,
  技能成功率提升: StatusSimple.SkilSuccUp,
  A技能得分提升: StatusSimple.AScorUp,
  红属性提升: StatusSimple.VocalUp,
  蓝属性提升: StatusSimple.DanceUp,
  黄属性提升: StatusSimple.VisualUp,
  黄属性降低: StatusSimple.VisualDn,
  连击得分提升: StatusSimple.CombScorUp,
  连击接续: StatusSimple.NoBreak,
} as const

const __STATUSES = Object.keys(Statuses)

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
        before: typ.toUpperCase() as 'SP' | 'A',
      },
    }),
  },
  {
    spec: ['当', ['on', __WHO], ['s', __STATUSES], '状态时'],
    body: ({ s, on }) => ({
      type: 'when',
      when: {
        on,
        status: Statuses[s as keyof typeof Statuses],
      },
    }),
  },
  {
    spec: ['当', ['on', __WHO], ['prop', ['体力']], ['s', [/(\d+)/]], '以下时'],
    body: ({ s, on, prop }) => ({
      type: 'when',
      when: {
        on,
        prop: PropertySimple.Stamina,
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
        prop: PropertySimple.Stamina,
        value: {
          $gt: Number(s),
        },
      },
    }),
  },
  {
    spec: ['当', ['on', __WHO], ['prop', __PROPS], '高于', ['s', [/(\d+)/]]],
    body: ({ s, on, prop }) => ({
      type: 'when',
      when: {
        on,
        prop: Props[prop as keyof typeof Props],
        value: {
          $gt: Number(s),
        },
      },
    }),
  },
  {
    spec: ['当', ['on', __WHO], ['prop', __PROPS], '低于', ['s', [/(\d+)/]]],
    body: ({ s, on, prop }) => ({
      type: 'when',
      when: {
        on,
        prop: Props[prop as keyof typeof Props],
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
        event: {
          type: 'critical',
        },
        on: 'self',
      },
    }),
  },
  {
    spec: [/^暴击时$/],
    body: () => ({
      type: 'when',
      when: {
        event: {
          type: 'critical',
        },
      },
    }),
  },
  {
    spec: ['自己处于', ['color', __RGB]],
    body: ({ color }) => ({
      type: 'when',
      when: {
        on: 'self',
        trackType: color,
      },
    }),
  },
  {
    spec: ['连击', /以上|高于/, ['s', [/(\d+)/]]],
    body: ({ s }) => ({
      type: 'when',
      when: {
        event: {
          type: 'combo',
          combo: { $gt: Number(s) },
        },
      },
    }),
  },
  {
    spec: [['s', [/(\d+)/]], '连击', /以上|高于/],
    body: ({ s }) => ({
      type: 'when',
      when: {
        event: {
          type: 'combo',
          combo: { $gt: Number(s) },
        },
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
      ctDecrease: Number(s),
      on,
    }),
  },
  {
    spec: [['on', __WHO], '体力回复', ['s', [/(\d+)/]]],
    body: ({ s, on }) => ({
      type: 'stamRecovery',
      stamRecovery: Number(s),
      on,
    }),
  },
  {
    spec: [['s', [/CT[:：](\d+)/]]],
    body: ({ s }) => ({
      type: 'ct',
      ct: Number(s),
    }),
  },
  {
    spec: ['赋予', ['on', __WHO], ['s', [/(\d+)层/]], ['color', __RGB], '提升'],
    body: ({ s, color, on }) => {
      const giveStatus =
        color === '红'
          ? StatusSimple.VocalUp
          : color === '蓝'
          ? StatusSimple.DanceUp
          : StatusSimple.VisualUp
      return {
        type: 'giveStatus',
        giveStatus,
        level: Number(s),
        on,
      }
    },
  },
  {
    spec: ['赋予', ['on', __WHO], ['s', [/(\d+)层/]], ['status', __STATUSES]],
    body: ({ s, status, on }) => ({
      type: 'giveStatus',
      giveStatus: Statuses[status as keyof typeof Statuses],
      on,
      level: Number(s),
    }),
  },
  {
    spec: ['赋予', ['on', __WHO], ['status', __STATUSES]],
    body: ({ status, on }) => ({
      type: 'giveStatus',
      giveStatus: Statuses[status as keyof typeof Statuses],
      on,
    }),
  },
  {
    spec: [['prop', __PROP_STATS], '得分提升'],
    body: ({ prop }) => ({
      type: 'giveStatus',
      giveStatus: StatusSimple.ScoringUp,
    }),
  },
  {
    spec: [/^连击数得分提升$/],
    body: () => ({
      type: 'giveStatus',
      giveStatus: StatusSimple.CombScorUp,
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
      type: 'limit',
      length: Number(l),
    }),
  },
]
