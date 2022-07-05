import { describe, it } from 'mocha'
import { expect } from 'chai'

import skillxToString from './skillxToString'

// Actually more of a sample skill translation rather than unit tests.
// (There are too many repetitions for a unit test suite.)

describe('effects', function () {
  describe('EffectScoreGetTyp', function () {
    it('score_get', function () {
      expect(
        // sk-yu-03-schl-00-2
        skillxToString({
          effect: {
            typ: 'score_get',
            typ2: 2800,
          },
          target: {
            typ: 'chart_dependence',
          },
        })
      ).to.eq('取得280%得分')
    })

    it('score_get_by_less_fan_amount', function () {
      expect(
        // sk-mei-04-casl-00-2
        skillxToString({
          effect: {
            typ: 'score_get_by_less_fan_amount',
            typ2: 450,
          },
          target: {
            typ: 'chart_dependence',
          },
        })
      ).to.eq('取得45%得分（观众数越少效果越好）')
    })

    it('score_get_by_more_fan_engage', function () {
      expect(
        // sk-rui-01-casl-00-2
        skillxToString({
          effect: {
            typ: 'score_get_by_more_fan_engage',
            typ2: 3300,
          },
          target: {
            typ: 'chart_dependence',
          },
        })
      ).to.eq('取得330%得分（核心粉丝率越高效果越好）')
    })

    it('score_get_by_more_combo_count', function () {
      expect(
        // sk-yu-05-xmas-00-2
        skillxToString({
          effect: {
            typ: 'score_get_by_more_combo_count',
            typ2: 3300,
          },
          target: {
            typ: 'chart_dependence',
          },
        })
      ).to.eq('取得330%得分（连击数越高效果越好）')
    })

    it('score_get_by_skill_activation_count', function () {
      expect(
        // sk-rei-05-onep-00-3
        skillxToString({
          effect: {
            typ: 'score_get_by_skill_activation_count',
            typ2: 500,
          },
          target: {
            typ: 'chart_dependence',
          },
        })
      ).to.eq('取得50%得分（技能发动数越多效果越好）')
    })

    it('score_get_by_strength_effect_count', function () {
      expect(
        // sk-rei-05-rock-00-1
        skillxToString({
          effect: {
            typ: 'score_get_by_strength_effect_count',
            typ2: 5600,
          },
          target: {
            typ: 'chart_dependence',
          },
        })
      ).to.eq('取得560%得分（强化状态种类数越多效果越好）')
    })

    it('score_get_by_more_stamina_use', function () {
      expect(
        // sk-rio-05-fest-00-1
        skillxToString({
          effect: {
            typ: 'score_get_by_more_stamina_use',
            typ2: 10800,
          },
          target: {
            typ: 'chart_dependence',
          },
        })
      ).to.eq('取得1080%得分（消耗体力越多效果越好）')
    })

    it('score_get_by_more_stamina', function () {
      expect(
        // sk-aoi-05-vlnt-00-2
        skillxToString({
          effect: {
            typ: 'score_get_by_more_stamina',
            typ2: 2400,
          },
          target: {
            typ: 'chart_dependence',
          },
        })
      ).to.eq('取得240%得分（剩余体力越多效果越好）')
    })

    it('score_get_by_less_stamina', function () {
      expect(
        // sk-kkr-04-casl-00-1
        skillxToString({
          effect: {
            typ: 'score_get_by_less_stamina',
            typ2: 9900,
          },
          target: {
            typ: 'chart_dependence',
          },
        })
      ).to.eq('取得990%得分（剩余体力越少效果越好）')
    })

    it('score_get_and_stamina_consumption_by_more_stamina_use', function () {
      expect(
        // sk-mna-05-prem-00-1
        skillxToString({
          effect: {
            typ: 'score_get_and_stamina_consumption_by_more_stamina_use',
            typ2: 10500,
          },
          target: { typ: 'chart_dependence' },
        })
      ).to.eq('取得1050%得分（技能消耗体力越多效果越好）')
    })
  })

  describe('score_get_by_status_effect_type_grade', function () {
    it('score_get_by_status_effect_type_grade', function () {
      expect(
        // sk-aoi-05-kait-00-1
        skillxToString({
          effect: {
            typ: 'score_get_by_status_effect_type_grade',
            prt: 'vocal_up',
            lvl: 9000,
          },
          target: {
            typ: 'chart_dependence',
          },
        })
      ).to.eq('取得900%得分（演唱（红）属性提升层数越多效果越好）')
    })
  })

  describe('score_get_by_trigger', function () {
    it('score_get_by_trigger', function () {
      expect(
        // sk-yu-05-xmas-00-1
        skillxToString({
          effect: {
            typ: 'score_get_by_trigger',
            lvl: 9000,
            cond: {
              typ: 'combo',
              len: 80,
            },
            condLvl: 16000,
          },
          target: {
            typ: 'chart_dependence',
          },
        })
      ).to.eq('取得900%得分（当连击数达到80时为1600%）')
    })
  })

  describe('EffectCharacterLengthLevelTyp', function () {
    it('vocal_up', function () {
      expect(
        // sk-ai-03-schl-00-1
        skillxToString({
          effect: {
            typ: 'vocal_up',
            lvl: 5,
            len: 13,
          },
          target: {
            typ: 'vocal_higher',
            cnt: 1,
          },
        })
      ).to.eq('赋予红属性高1人5阶段演唱（红）属性提升状态[13拍]')
    })

    it('vocal_boost', function () {
      expect(
        // sk-mhk-05-idol-00-1
        skillxToString({
          effect: {
            typ: 'visual_boost',
            lvl: 6,
            len: 31,
          },
          target: {
            typ: 'visual',
            cnt: 2,
          },
        })
      ).to.eq('赋予黄属性2人6阶段表演（黄）属性增幅状态[31拍]')
    })

    it('active_skill_score_up', function () {
      expect(
        // sk-ai-05-kait-00-2
        skillxToString({
          effect: {
            typ: 'active_skill_score_up',
            lvl: 7,
            len: 38,
          },
          target: {
            typ: 'all',
            cnt: 1,
          },
        })
      ).to.eq('赋予全员7阶段A技能得分提升状态[38拍]')
    })

    it('tension_up', function () {
      expect(
        // sk-ai-05-tact-00-3
        skillxToString({
          effect: {
            typ: 'tension_up',
            lvl: 4,
            len: 35,
          },
          target: {
            typ: 'character_type',
            typ2: 1,
            cnt: 2,
          },
        })
      ).to.eq('赋予[得分]属性2人4阶段集目状态[35拍]')
    })

    it('critical_bonus_permil_up', function () {
      expect(
        // sk-ai-05-vlnt-00-2
        skillxToString({
          effect: {
            typ: 'critical_bonus_permil_up',
            lvl: 4,
            len: 37,
          },
          target: {
            typ: 'character_type',
            typ2: 1,
            cnt: 2,
          },
        })
      ).to.eq('赋予[得分]属性2人4阶段暴击系数提升状态[37拍]')
    })
  })

  describe('EffectCharacterLevelOnlyTyp', function () {
    it('skill_impossible', function () {
      expect(
        // sk-ai-04-casl-00-2
        skillxToString({
          effect: {
            typ: 'skill_impossible',
            len: 50,
          },
          target: {
            typ: 'self',
            cnt: 1,
          },
        })
      ).to.eq('赋予自身不调状态[50拍]')
    })

    it('combo_continuation', function () {
      expect(
        // sk-szk-05-idol-00-1
        skillxToString({
          effect: {
            typ: 'combo_continuation',
            len: 20,
          },
          target: {
            typ: 'all',
            cnt: 1,
          },
        })
      ).to.eq('赋予全员连击接续状态[20拍]')
    })
    it('fix_stamina_recovery', function () {
      expect(
        // sk-suz-04-casl-00-1
        skillxToString({
          effect: {
            typ: 'fix_stamina_recovery',
            lvl: 700,
          },
          target: {
            typ: 'stamina_lower',
            cnt: 1,
          },
        })
      ).to.eq('体力低1人体力回复700')
    })

    it('target_stamina_recovery', function () {
      expect(
        // sk-live-lba-passive_skill-039
        skillxToString({
          effect: {
            typ: 'target_stamina_recovery',
            lvl: 450,
          },
          target: {
            typ: 'center',
            cnt: 1,
          },
        })
      ).to.eq('中心体力回复45%')
    })

    it('cool_time_reduction', function () {
      expect(
        // sk-ai-05-vlnt-00-1
        skillxToString({
          effect: {
            typ: 'cool_time_reduction',
            lvl: 15,
          },
          target: {
            typ: 'dance',
            cnt: 2,
          },
        })
      ).to.eq('蓝属性2人CT降低15')
    })

    it('strength_effect_count_increase', function () {
      expect(
        // sk-rui-05-mizg-01-1
        skillxToString({
          effect: {
            typ: 'strength_effect_count_increase',
            lvl: 5,
          },
          target: {
            typ: 'character_type',
            typ2: 1,
            cnt: 2,
          },
        })
      ).to.eq('[得分]属性2人强化效果延长5拍')
    })

    it('strength_effect_value_increase', function () {
      expect(
        // sk-ai-05-tact-00-1
        skillxToString({
          effect: {
            typ: 'strength_effect_value_increase',
            lvl: 1,
          },
          target: {
            typ: 'all',
            cnt: 1,
          },
        })
      ).to.eq('全员强化效果增强1拍')
    })

    it('stamina_consumption', function () {
      expect(
        // sk-ktn-05-wedd-00-3
        skillxToString({
          effect: {
            typ: 'stamina_consumption',
            lvl: 1200,
          },
          target: {
            typ: 'opponent_same_position',
            cnt: 1,
          },
        })
      ).to.eq('对手同位置消耗体力1200')
    })
  })

  describe('EffectCharacterSimpleTyp', function () {
    it('weakness_effect_recovery', function () {
      expect(
        // sk-ai-03-schl-00-1
        skillxToString({
          effect: {
            typ: 'weakness_effect_recovery',
          },
          target: {
            typ: 'vocal_higher',
            cnt: 1,
          },
        })
      ).to.eq('红属性高1人低下状态回复')
    })

    it('weakness_effect_inversion', function () {
      expect(
        // sk-skr-05-idol-03-1
        skillxToString({
          effect: {
            typ: 'weakness_effect_inversion',
          },
          target: {
            typ: 'dance',
            cnt: 3,
          },
        })
      ).to.eq('蓝属性3人低下状态反转')
    })

    it('strength_effect_migration_before_special_skill', function () {
      expect(
        // sk-ktn-05-fest-00-3
        skillxToString({
          effect: {
            typ: 'strength_effect_migration_before_special_skill',
          },
          target: {
            typ: 'dance',
            cnt: 1,
          },
        })
      ).to.eq('蓝属性1人强化效果移动至SP技能前')
    })

    it('strength_effect_migration_before_active_skill', function () {
      expect(
        // sk-hrk-05-idol-03-1
        skillxToString({
          effect: {
            typ: 'strength_effect_migration_before_active_skill',
          },
          target: {
            typ: 'neighbor',
            cnt: 1,
          },
        })
      ).to.eq('相邻位置强化效果移动至A技能前')
    })

    it('strength_effect_erasing_all', function () {
      expect(
        // sk-kan-05-idol-00-1
        skillxToString({
          effect: {
            typ: 'strength_effect_erasing_all',
          },
          target: {
            typ: 'opponent_center',
            cnt: 1,
          },
        })
      ).to.eq('对手中心强化效果消除')
    })
  })
})

describe('targets', function () {
  it('chart_dependence', function () {
    expect(
      // sk-yu-03-schl-00-2
      skillxToString({
        effect: {
          typ: 'score_get',
          typ2: 2800,
        },
        target: {
          typ: 'chart_dependence',
        },
      })
    ).to.eq('取得280%得分')
  })

  it('opponent_center', function () {
    expect(
      // sk-ai-05-vlnt-00-2
      skillxToString({
        effect: {
          typ: 'dance_down',
          lvl: 6,
          len: 28,
        },
        target: {
          typ: 'opponent_center',
          cnt: 1,
        },
      })
    ).to.eq('赋予对手中心6阶段舞蹈（蓝）属性下降状态[28拍]')
  })

  it('vocal', function () {
    expect(
      // sk-ngs-05-akma-00-1
      skillxToString({
        effect: {
          typ: 'combo_score_up',
          lvl: 6,
          len: 18,
        },
        target: {
          typ: 'vocal',
          cnt: 2,
        },
      })
    ).to.eq('赋予红属性2人6阶段连击得分提升状态[18拍]')
  })

  it('position_attribute_visual', function () {
    expect(
      // sk-smr-05-frut-00-2
      skillxToString({
        effect: {
          typ: 'skill_success_rate_up',
          lvl: 3,
          len: 24,
        },
        target: {
          typ: 'position_attribute_visual',
          cnt: 2,
        },
      })
    ).to.eq('赋予黄轨道2人3阶段技能成功率提升状态[24拍]')
  })

  it('opponent_character_type', function () {
    expect(
      // sk-mei-05-fest-00-1
      skillxToString({
        effect: {
          typ: 'skill_impossible',
          len: 30,
        },
        target: {
          typ: 'opponent_character_type',
          typ2: 1,
          cnt: 2,
        },
      })
    ).to.eq('赋予对手[得分]属性2人不调状态[30拍]')
  })

  it('trigger', function () {
    expect(
      // sk-ngs-05-akma-00-2
      skillxToString(
        {
          effect: {
            typ: 'critical_rate_up',
            lvl: 3,
            len: 20,
          },
          target: {
            typ: 'trigger',
            cnt: 1,
          },
        },
        'tg-before_active_skill_by_someone'
      )
    ).to.eq('[某人A技能发动前]赋予3阶段暴击率提升状态[20拍]')
  })

  it('status', function () {
    expect(
      // sk-tour-lba-passive_skill-character_limited-ai-1
      skillxToString({
        effect: {
          typ: 'strength_effect_value_increase',
          lvl: 2,
        },
        target: {
          typ: 'status',
          typ2: 'dance_up',
          cnt: 1,
        },
      })
    ).to.eq('处于状态[舞蹈（蓝）属性提升]时1人强化效果增强2拍')
  })
})
