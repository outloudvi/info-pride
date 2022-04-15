import {
  Matcher,
  PropertySimple,
  StatusLinkSimple,
  StatusSimple,
} from './types.js'

const __RGB = ['红', '黄', '蓝']
const __WHO = [
  '自己',
  '相邻角色',
  /(?<on>中心(位置)?角色)/,
  '全员',
  /(?<color1>[红黄蓝])属性值?最?高的?(?<num>\d+)人/,
  /(?<color2>[红黄蓝])(属性)?(角色)?(?<num>\d+)人/,
  /(?<color3>[红黄蓝])轨道角色(?<num>\d+)人/,
  /对象(?<num>\d+)人/,
  /得分(角色|手)(?<num>\d+)人/,
  /体力最低的(?<num>\d+)人/,
  '谁',
  '对象',
  '其',
  '该角色',
]

const Props = {
  体力: PropertySimple.Stamina,
} as const

const __PROPS = Object.keys(Props)

const StatusesCommons = {
  隐身: StatusSimple.Invisible,
  集目: StatusSimple.Focused,
  不调: StatusSimple.BadCond,
  气氛高昂: StatusSimple.HighSpirits,
  节拍得分: StatusSimple.BeatScoring,
  暴击系数提升: StatusSimple.CritCoefUp,
  暴击率提升: StatusSimple.CritRateUp,
  体力消耗提升: StatusSimple.StamDraiUp,
  体力消耗降低: StatusSimple.StamDraiDn,
  技能成功率提升: StatusSimple.SkilSuccUp,
  A技能得分提升: StatusSimple.AScorUp,
  红属性提升: StatusSimple.VocalUp,
  红属性降低: StatusSimple.VocalDn,
  蓝属性提升: StatusSimple.DanceUp,
  蓝属性降低: StatusSimple.DanceDn,
  黄属性提升: StatusSimple.VisualUp,
  黄属性降低: StatusSimple.VisualDn,
  连击得分提升: StatusSimple.CombScorUp,
  连击接续: StatusSimple.NoBreak,
  强化状态延长: StatusSimple.EnhanceExtend,
  强化状态增强: StatusSimple.EnhanceStrengthen,
  低下状态回复: StatusSimple.NegRecover,
  低下状态防止: StatusSimple.NoNeg,
} as const

const Statuses = {
  ...StatusesCommons,
  得分提升: StatusSimple.ScoringUp,
}

const __STATUSES = Object.keys(Statuses)

const StatusLinks = {
  暴击系数层数: StatusLinkSimple.Critical,
  强化状态种类: StatusLinkSimple.EnhancedStatus,
  消耗体力: StatusLinkSimple.CostStamina,
  技能发动数: StatusLinkSimple.SkillExecCount,
  剩余体力多: StatusLinkSimple.MostStamina,
  粉丝核心率多: StatusLinkSimple.MostCoreFanRate,
  剩余体力少: StatusLinkSimple.LeastStamina,
  观众数量少: StatusLinkSimple.LeastAudCount,
  ...StatusesCommons,
}

const __STATUS_LINKS = Object.keys(StatusLinks)

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
    spec: [/^当自己处于中心位置时$/],
    body: () => ({
      type: 'when',
      when: {
        position: 'center',
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
    spec: ['当', ['prop', ['体力']], ['s', [/(\d+)/]], '以上时'],
    body: ({ s, on, prop }) => ({
      type: 'when',
      when: {
        on: 'self',
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
    spec: ['连击', '高于', ['s', [/(\d+)/]]],
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
    spec: ['连击', ['s', [/(\d+)/]], '以上'],
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
  {
    spec: [/^对决演出(模式下|时)$/],
    body: () => ({
      type: 'when',
      when: {
        isBattle: true,
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
    spec: [/取得|赋予/, ['s', [/(\d+)[％%]/]], /得分|分数/],
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
    spec: [['on', __WHO], '减少', ['s', [/(\d+)/]], 'CT'],
    body: ({ s, on }) => ({
      type: 'ctDecrease',
      ctDecrease: Number(s),
      on,
    }),
  },
  {
    spec: [['on', __WHO], '回复', ['s', [/(\d+)/]], '体力'],
    body: ({ s, on }) => ({
      type: 'stamRecovery',
      stamRecovery: Number(s),
      on,
    }),
  },
  {
    spec: [['on', __WHO], '回复', '体力', ['s', [/(\d+)/]]],
    body: ({ s, on }) => ({
      type: 'stamRecovery',
      stamRecovery: Number(s),
      on,
    }),
  },
  {
    spec: [/所有强化效果移动到sp技能之前/],
    body: () => ({
      type: 'move',
      move: 'beforeSP',
    }),
  },
  {
    spec: ['全员', '低下状态', '回复'],
    body: () => ({
      type: 'giveStatus',
      giveStatus: StatusSimple.NoNeg,
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
    spec: [['s', __STATUS_LINKS], /得分提升$/],
    body: ({ s }) => {
      return {
        type: 'giveStatus',
        giveStatus: StatusSimple.ScoringUp,
        linkedTo: StatusLinks[s as keyof typeof StatusLinks],
      }
    },
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
    spec: [['on', __WHO], '强化状态延长', ['s', [/(\d+)/]]],
    body: ({ s, on }) => ({
      type: 'giveStatus',
      giveStatus: StatusSimple.EnhanceExtend,
      on,
      level: Number(s),
    }),
  },
  {
    spec: ['赋予同轨的对手', ['s', [/(\d+)层/]], ['status', __STATUSES]],
    body: ({ s, status }) => ({
      type: 'giveRivalStatus',
      giveStatus: Statuses[status as keyof typeof Statuses],
      on: 'sameTrack',
      level: Number(s),
    }),
  },
  {
    spec: [/赋予|使/, ['on', __WHO], ['status', __STATUSES]],
    body: ({ status, on }) => ({
      type: 'giveStatus',
      giveStatus: Statuses[status as keyof typeof Statuses],
      on,
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
