import type { IdolName } from './idols'
import type { ChapterItem } from './stories'

const data: Partial<
  Record<
    IdolName,
    Record<
      number,
      Record<1 | 2 | 3, ChapterItem> &
        Partial<Record<'phone', Omit<ChapterItem, 'name'>>>
    >
  >
> = {
  川咲樱: {
    4: {
      // 梦的共演
      1: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av291359551' },
      },
      2: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av803995318' },
      },
      3: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av588913322' },
      },
    },
    5: {
      // 希望成为你的光芒
      1: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av590864753', pid: 1 },
      },
      2: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av590864753', pid: 2 },
      },
      3: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av590864753', pid: 3 },
      },
    },
    6: {
      // 笑口开，福运来
      1: {
        name: '羽毛球对决',
        video: { type: 'bilibili', vid: 'av765411385', pid: 1 },
      },
      2: {
        name: '携手共进',
        video: { type: 'bilibili', vid: 'av765411385', pid: 2 },
      },
      3: {
        name: '新年快乐！',
        video: { type: 'bilibili', vid: 'av765411385', pid: 3 },
      },
    },
  },
  一之濑怜: {
    3: {
      // 高台上微风轻拂
      1: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av804212174' },
      },
      2: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av804212174' },
      },
      3: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av804212174' },
      },
    },
    6: {
      // 绝对秘密的吃货后台
      1: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av892912195', pid: 1 },
      },
      2: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av892912195', pid: 2 },
      },
      3: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av892912195', pid: 3 },
      },
    },
  },
  长濑琴乃: {
    5: {
      // 娇羞夏月
      1: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av380460959', pid: 1 },
      },
      2: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av380460959', pid: 2 },
      },
      3: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av380460959', pid: 3 },
      },
    },
    6: {
      // 光华霜夜
      1: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av295230169', pid: 1 },
      },
      2: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av295230169', pid: 2 },
      },
      3: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av295230169', pid: 3 },
      },
    },
  },
  兵藤雫: {
    6: {
      // 能够一起唱歌的幸福
      1: {
        name: '意外的选择',
        video: { type: 'bilibili', vid: 'av254481784' },
      },
      2: {
        name: '笨拙而正直的努力',
        video: { type: 'bilibili', vid: 'av894487028' },
      },
      3: {
        name: '和憧憬之人前往同一舞台',
        video: { type: 'bilibili', vid: 'av681881066' },
      },
    },
  },
  伊吹渚: {
    6: {
      // 喜欢恶作剧的小恶魔
      // <s>直球偷家</s>
      1: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av424455150' },
      },
      2: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av424429682' },
      },
      3: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av466939788' },
      },
    },
  },
  井川葵: {
    4: {
      1: {
        name: '不只是二月的巧克力而已',
        video: { type: 'bilibili', vid: 'av594183571' },
      },
      2: {
        name: '承载心意的礼物',
        video: { type: 'bilibili', vid: 'av381757709' },
      },
      3: {
        name: '连我也觉得害羞了',
        video: { type: 'bilibili', vid: 'av381806931' },
      },
    },
    5: {
      1: {
        name: '隐瞒和蟹肉棒',
        video: { type: 'bilibili', vid: 'av250442533', pid: 1 },
      },
      2: {
        name: '不要客气',
        video: { type: 'bilibili', vid: 'av250442533', pid: 2 },
      },
      3: {
        name: '唠唠叨叨',
        video: { type: 'bilibili', vid: 'av250442533', pid: 3 },
      },
    },
  },
  白石沙季: {
    5: {
      1: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av850413582', pid: 1 },
      },
      2: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av850413582', pid: 2 },
      },
      3: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av850413582', pid: 3 },
      },
    },
  },
  天动瑠依: {
    4: {
      // 真实的姿态
      1: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av759141474', pid: 1 },
      },
      2: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av759141474', pid: 2 },
      },
      3: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av759141474', pid: 3 },
      },
    },
    5: {
      // 盛夏的羞耻拍摄
      1: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av291767075', pid: 1 },
      },
      2: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av291767075', pid: 2 },
      },
      3: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av291767075', pid: 3 },
      },
    },
    6: {
      // 带有白色气息的圣诞夜
      // #朝仓正在提刀赶来的路上
      1: {
        name: '保密的会谈',
        video: { type: 'bilibili', vid: 'av337058848' },
      },
      2: {
        name: '只有两人的购物时光',
        video: { type: 'bilibili', vid: 'av549582021' },
      },
      3: {
        name: '已经是我的了',
        video: { type: 'bilibili', vid: 'av849532334' },
      },
    },
  },
  铃村优: {
    3: {
      // 白色冲击
      1: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av206507224', pid: 1 },
      },
      2: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av206507224', pid: 2 },
      },
      3: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av206507224', pid: 3 },
      },
    },
    4: {
      // 秘密的照片会话
      1: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av206687488' },
      },
      2: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av206687488' },
      },
      3: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av206687488' },
      },
    },
    5: {
      // 我们的平安夜
      1: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av294899075' },
      },
      2: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av294899075' },
      },
      3: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av294899075' },
      },
    },
  },
  奥山堇: {
    3: {
      // 小小的女主角
      1: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av589063431', pid: 1 },
      },
      2: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av589063431', pid: 2 },
      },
      3: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av589063431', pid: 3 },
      },
    },
    4: {
      // 常夏水上公园
      1: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av761719585', pid: 1 },
      },
      2: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av761719585', pid: 2 },
      },
      3: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av761719585', pid: 3 },
      },
    },
    5: {
      // 六花彩灯
      1: {
        name: '大笨蛋！',
        video: { type: 'bilibili', vid: 'av719530528', pid: 1 },
      },
      2: {
        name: '终于再次绽放的笑容',
        video: { type: 'bilibili', vid: 'av719530528', pid: 2 },
      },
      3: {
        name: '珍贵的礼物',
        video: { type: 'bilibili', vid: 'av719530528', pid: 3 },
      },
    },
    6: {
      // Little Lover
      1: {
        name: '偶像与学生的间隙',
        video: { type: 'bilibili', vid: 'av594661083' },
      },
      2: {
        name: '连结过去与现在',
        video: { type: 'bilibili', vid: 'av339799350' },
      },
      3: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av594759853' },
      },
    },
  },
  神崎莉央: {
    4: {
      1: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av206825976' },
      },
      2: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av206825976' },
      },
      3: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av206825976' },
      },
    },
    6: {
      // 她的魅力、宛如怪物一级
      1: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av208733508', pid: 1 },
      },
      2: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av208733508', pid: 2 },
      },
      3: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av208733508', pid: 3 },
      },
    },
    7: {
      // 比起奇迹，还是必然更好
      1: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av507684412', pid: 1 },
      },
      2: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av507684412', pid: 2 },
      },
      3: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av507684412', pid: 3 },
      },
    },
  },
  小美山爱: {
    3: {
      // 抓住梦想
      1: {
        name: '我不在了也可以吗？',
        video: { type: 'bilibili', vid: 'av334321966' },
      },
      2: {
        name: '超咸的拉面',
        video: { type: 'bilibili', vid: 'av334321966' },
      },
      3: {
        name: '三封信',
        video: { type: 'bilibili', vid: 'av334321966' },
      },
    },
    5: {
      // 情人节的一点小礼物
      1: {
        name: '挚友的真心话',
        video: { type: 'bilibili', vid: 'av978704433' },
      },
      2: {
        name: '还是偶像练习生的时候',
        video: { type: 'bilibili', vid: 'av678853576' },
      },
      3: {
        name: '咸味巧克力',
        video: { type: 'bilibili', vid: 'av636356378' },
      },
      phone: {
        video: { type: 'bilibili', vid: 'av979531881' },
      },
    },
  },
  赤崎心: {
    5: {
      // 映象深刻的绝赞中心
      1: {
        name: '袒露的泄气话',
        video: { type: 'bilibili', vid: 'av466356704' },
      },
      2: {
        name: '情人节能干点什么',
        video: { type: 'bilibili', vid: 'av893905730' },
      },
      3: {
        name: '苦味的情人节礼物',
        video: { type: 'bilibili', vid: 'av594016586' },
      },
      phone: {
        video: { type: 'bilibili', vid: 'av679608767' },
      },
    },
  },
}

export default data
