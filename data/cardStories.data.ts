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
  长濑麻奈: {
    1: {
      // You're my everything
      1: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av208278177', pid: 1 },
      },
      2: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av208278177', pid: 2 },
      },
      3: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av208278177', pid: 3 },
      },
    },
    2: {
      // 执子之手
      // #编剧辛苦了 #论只用语气词片段到底能组出什么剧情语音 #这块木头气死了 #不过果然是刀吧
      1: {
        name: '突然的礼物',
        video: { type: 'bilibili', vid: 'av595197954', pid: 1 },
      },
      2: {
        name: '要是能一直这样下去的话',
        video: { type: 'bilibili', vid: 'av595197954', pid: 2 },
      },
      3: {
        name: '自那之后不变的心意',
        video: { type: 'bilibili', vid: 'av595197954', pid: 3 },
      },
    },
  },
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
      // dups: av931765423
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
    4: {
      // 百折不挠
      1: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av850483576', pid: 1 },
      },
      2: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av850483576', pid: 2 },
      },
      3: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av850483576', pid: 3 },
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
  佐伯遥子: {
    3: {
      // 可靠的大姐姐
      1: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av931773133', pid: 1 },
      },
      2: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av931773133', pid: 2 },
      },
      3: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av931773133', pid: 3 },
      },
    },
    4: {
      // 沐浴阳光
      1: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av804365970', pid: 1 },
      },
      2: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av804365970', pid: 2 },
      },
      3: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av804365970', pid: 3 },
      },
    },
    6: {
      // 二人的冬日庆典
      1: {
        name: '复杂的心情',
        video: { type: 'bilibili', vid: 'av507396126', pid: 1 },
      },
      2: {
        name: '过去的我',
        video: { type: 'bilibili', vid: 'av507396126', pid: 2 },
      },
      3: {
        name: '二人的庆功宴',
        video: { type: 'bilibili', vid: 'av507396126', pid: 3 },
      },
    },
    7: {
      // 绽放吧十七岁 (17 岁？)
      1: {
        name: '克服羞耻心',
        video: { type: 'bilibili', vid: 'av212419381' },
      },
      2: {
        name: '释放吧',
        video: { type: 'bilibili', vid: 'av725033621' },
      },
      3: {
        name: '万众瞩目的一刻',
        video: { type: 'bilibili', vid: 'av895030224' },
      },
      phone: {
        video: { type: 'bilibili', vid: 'av595085113' },
      },
    },
  },
  长濑琴乃: {
    4: {
      1: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av892980835', pid: 1 },
      },
      2: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av892980835', pid: 2 },
      },
      3: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av892980835', pid: 3 },
      },
    },
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
  白石千纱: {
    4: {
      // 一夜限定的神圣舞台
      1: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av250917999', pid: 1 },
      },
      2: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av250917999', pid: 2 },
      },
      3: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av250917999', pid: 3 },
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
    3: {
      // 靠在你的身后
      1: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av677917588', pid: 1 },
      },
      2: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av677917588', pid: 2 },
      },
      3: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av677917588', pid: 3 },
      },
    },
    4: {
      // 闪耀海滩上的讯息
      1: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av295432774', pid: 1 },
      },
      2: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av295432774', pid: 2 },
      },
      3: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av295432774', pid: 3 },
      },
    },
    5: {
      // 这一瞬间的主角
      1: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av336786216', pid: 1 },
      },
      2: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av336786216', pid: 2 },
      },
      3: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av336786216', pid: 3 },
      },
    },
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
      phone: {
        video: { type: 'bilibili', vid: 'av767558058' },
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
    3: {
      // 手牵手
      1: {
        name: '整理整顿',
        video: { type: 'bilibili', vid: 'av631776373', pid: 1 },
      },
      2: {
        name: '有在发光吗？',
        video: { type: 'bilibili', vid: 'av631776373', pid: 2 },
      },
      3: {
        name: '与千纱的相处方式',
        video: { type: 'bilibili', vid: 'av631776373', pid: 3 },
      },
    },
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
  成宫铃: {
    3: {
      // 星光满溢
      1: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av550376484', pid: 1 },
      },
      2: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av550376484', pid: 2 },
      },
      3: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av550376484', pid: 3 },
      },
    },
    4: {
      // 微苦的夏日回忆
      1: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av592968587', pid: 1 },
      },
      2: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av592968587', pid: 2 },
      },
      3: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av592968587', pid: 3 },
      },
    },
    5: {
      // 节目效果拉满
      1: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av550498872', pid: 1 },
      },
      2: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av550498872', pid: 2 },
      },
      3: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av550498872', pid: 3 },
      },
    },
  },
  早坂芽衣: {
    3: {
      // 镜头下的笑容
      1: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av503841344', pid: 1 },
      },
      2: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av503841344', pid: 2 },
      },
      3: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av503841344', pid: 3 },
      },
    },
    4: {
      // 只有两个人的日落海滩
      1: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av889558362', pid: 1 },
      },
      2: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av889558362', pid: 2 },
      },
      3: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av889558362', pid: 3 },
      },
    },
    5: {
      // 未来某一天再一起
      1: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av721401394', pid: 1 },
      },
      2: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av721401394', pid: 2 },
      },
      3: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av721401394', pid: 3 },
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
    4: {
      // 对我来说重要的歌
      1: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av677986629', pid: 1 },
      },
      2: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av677986629', pid: 2 },
      },
      3: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av677986629', pid: 3 },
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
    3: {
      // 新liznoir的“骄傲”
      1: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av594759853', pid: 1 },
      },
      2: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av594759853', pid: 2 },
      },
      3: {
        name: 'TODO',
        video: { type: 'bilibili', vid: 'av594759853', pid: 3 },
      },
    },
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
