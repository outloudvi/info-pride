import {
  ColorTypeSimple,
  Matcher,
  PropertySimple,
  StatusLinkSimple,
  StatusSimple,
  Targeted,
  TargetPersonNColorParamed,
  TargetPersonNParamed,
  TargetPersonSimple,
} from './types.js'

function colorTextToEnum(color: string) {
  switch (color) {
    case '红':
      return ColorTypeSimple.Vocal
    case '蓝':
      return ColorTypeSimple.Dance
    case '黄':
      return ColorTypeSimple.Visual
  }
  throw Error('Unrecognized color')
}

function parseWho(data: Record<string, string>): Targeted {
  switch (data.on) {
    case '自己':
      return {
        on: TargetPersonSimple.Self,
      }
    case '相邻角色':
      return {
        on: TargetPersonSimple.Neighbor,
      }
    case '全员': {
      return {
        on: TargetPersonSimple.Everyone,
      }
    }
    case '谁':
    case '对象':
    case '其':
    case '该角色':
      return {
        on: TargetPersonSimple.Targeted,
      }
  }
  if (data.wCenter) {
    return {
      on: TargetPersonSimple.Center,
    }
  }
  if (data.wColor1) {
    return {
      on: TargetPersonNColorParamed.HighestNOfProp,
      color: colorTextToEnum(data.wColor1),
      n: Number(data.num),
    }
  }
  if (data.wColor2) {
    return {
      on: TargetPersonNColorParamed.NOfProp,
      color: colorTextToEnum(data.wColor2),
      n: Number(data.num),
    }
  }
  if (data.wColor3) {
    return {
      on: TargetPersonNColorParamed.NOfTrack,
      color: colorTextToEnum(data.wColor3),
      n: Number(data.num),
    }
  }
  if (data.wTgtNum) {
    return {
      on: TargetPersonNParamed.SelectedN,
      n: Number(data.wTgtNum),
    }
  }
  if (data.wScoNum) {
    return {
      on: TargetPersonNParamed.ScorerN,
      n: Number(data.wScoNum),
    }
  }
  if (data.wStamNum) {
    return {
      on: TargetPersonNParamed.ScorerN,
      n: Number(data.wStamNum),
    }
  }
  throw Error('Unrecognized target')
}

const __RGB = ['红', '黄', '蓝']
const __WHO = [
  '自己',
  '相邻角色',
  /(?<wCenter>中心(位置)?角色)/,
  '全员',
  /(?<wColor1>[红黄蓝])属性值?最?高的?(?<num>\d+)人/,
  /(?<wColor2>[红黄蓝])(属性)?(角色)?(?<num>\d+)人/,
  /(?<wColor3>[红黄蓝])轨道角色(?<num>\d+)人/,
  /对象(?<wTgtNum>\d+)人/,
  /得分(角色|手)(?<wScoNum>\d+)人/,
  /体力最低的(?<wStamNum>\d+)人/,
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
  低下状态防止: StatusSimple.NoNegative,
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
    body: (data) => ({
      type: 'when',
      when: {
        status: Statuses[data.s as keyof typeof Statuses],
        ...parseWho(data),
      },
    }),
  },
  {
    spec: ['当', ['on', __WHO], ['prop', ['体力']], ['s', [/(\d+)/]], '以下时'],
    body: (data) => ({
      type: 'when',
      when: {
        prop: PropertySimple.Stamina,
        value: {
          $lt: Number(data.s),
        },
        ...parseWho(data),
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
    body: (data) => ({
      type: 'when',
      when: {
        prop: PropertySimple.Stamina,
        value: {
          $gt: Number(data.s),
        },
        ...parseWho(data),
      },
    }),
  },
  {
    spec: ['当', ['prop', ['体力']], ['s', [/(\d+)/]], '以上时'],
    body: ({ s, on, prop }) => ({
      type: 'when',
      when: {
        on: TargetPersonSimple.Self,
        prop: PropertySimple.Stamina,
        value: {
          $gt: Number(s),
        },
      },
    }),
  },
  {
    spec: ['当', ['on', __WHO], ['prop', __PROPS], '高于', ['s', [/(\d+)/]]],
    body: (data) => ({
      type: 'when',
      when: {
        prop: Props[data.prop as keyof typeof Props],
        value: {
          $gt: Number(data.s),
        },
        ...parseWho(data),
      },
    }),
  },
  {
    spec: ['当', ['on', __WHO], ['prop', __PROPS], '低于', ['s', [/(\d+)/]]],
    body: (data) => ({
      type: 'when',
      when: {
        prop: Props[data.prop as keyof typeof Props],
        value: {
          $lt: Number(data.s),
        },
        ...parseWho(data),
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
        on: TargetPersonSimple.Self,
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
        on: TargetPersonSimple.Self,
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
    body: (data) => ({
      type: 'ctDecrease',
      ctDecrease: Number(data.s),
      ...parseWho(data),
    }),
  },
  {
    spec: [['on', __WHO], '减少', ['s', [/(\d+)/]], 'CT'],
    body: (data) => ({
      type: 'ctDecrease',
      ctDecrease: Number(data.s),
      ...parseWho(data),
    }),
  },
  {
    spec: [['on', __WHO], '回复', ['s', [/(\d+)/]], '体力'],
    body: (data) => ({
      type: 'stamRecovery',
      stamRecovery: Number(data.s),
      ...parseWho(data),
    }),
  },
  {
    spec: [['on', __WHO], '回复', '体力', ['s', [/(\d+)/]]],
    body: (data) => ({
      type: 'stamRecovery',
      stamRecovery: Number(data.s),
      ...parseWho(data),
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
      giveStatus: StatusSimple.NoNegative,
    }),
  },
  {
    spec: [['on', __WHO], '体力回复', ['s', [/(\d+)/]]],
    body: (data) => ({
      type: 'stamRecovery',
      stamRecovery: Number(data.s),
      ...parseWho(data),
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
    body: (data) => {
      const giveStatus = {
        [ColorTypeSimple.Vocal]: StatusSimple.VocalUp,
        [ColorTypeSimple.Dance]: StatusSimple.DanceUp,
        [ColorTypeSimple.Visual]: StatusSimple.VisualUp,
      }[colorTextToEnum(data.color)]
      return {
        type: 'giveStatus',
        giveStatus,
        level: Number(data.s),
        ...parseWho(data),
      }
    },
  },
  {
    spec: ['赋予', ['on', __WHO], ['s', [/(\d+)层/]], ['status', __STATUSES]],
    body: (data) => ({
      type: 'giveStatus',
      giveStatus: Statuses[data.status as keyof typeof Statuses],
      level: Number(data.s),
      ...parseWho(data),
    }),
  },
  {
    spec: [['on', __WHO], '强化状态延长', ['s', [/(\d+)/]]],
    body: (data) => ({
      type: 'giveStatus',
      giveStatus: StatusSimple.EnhanceExtend,
      level: Number(data.s),
      ...parseWho(data),
    }),
  },
  {
    spec: ['赋予同轨的对手', ['s', [/(\d+)层/]], ['status', __STATUSES]],
    body: ({ s, status }) => ({
      type: 'giveRivalStatus',
      giveRivalStatus: Statuses[status as keyof typeof Statuses],
      on: 'sameTrack',
      level: Number(s),
    }),
  },
  {
    spec: [/赋予|使/, ['on', __WHO], ['status', __STATUSES]],
    body: (data) => ({
      type: 'giveStatus',
      giveStatus: Statuses[data.status as keyof typeof Statuses],
      ...parseWho(data),
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
