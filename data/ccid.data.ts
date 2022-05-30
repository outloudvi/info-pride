import { CharacterId } from './vendor/characterId'

/**
 * This is the CCID table for all cards. It is generated with by /api/Card/Id,
 * but please use the ID given by bwiki if there is any conflict.
 */
export const CCIDTableWithName: Record<
  CharacterId,
  { ccid: number; cardId: string; nameJa: string }[]
> = {
  'char-ai': [
    { ccid: 1, cardId: 'card-ai-03-schl-00', nameJa: '嘘から出た実' },
    { ccid: 2, cardId: 'card-ai-04-casl-00', nameJa: 'ごほうび発見' },
    { ccid: 3, cardId: 'card-ai-05-idol-00', nameJa: '掴みとる夢' },
    { ccid: 4, cardId: 'card-ai-05-kait-00', nameJa: '私にとって大切な曲' },
    {
      ccid: 5,
      cardId: 'card-ai-05-vlnt-00',
      nameJa: 'ちょこ～っとバレンタイン',
    },
    { ccid: 6, cardId: 'card-ai-05-tact-00', nameJa: 'セクシーシューティング' },
  ],
  'char-aoi': [
    { ccid: 1, cardId: 'card-aoi-03-schl-00', nameJa: 'ホームグラウンド' },
    { ccid: 2, cardId: 'card-aoi-04-casl-00', nameJa: '冷めた夜' },
    { ccid: 3, cardId: 'card-aoi-05-idol-00', nameJa: '濡れた髪は何を語る' },
    { ccid: 4, cardId: 'card-aoi-05-kait-00', nameJa: 'growing up！' },
    {
      ccid: 5,
      cardId: 'card-aoi-05-vlnt-00',
      nameJa: 'おかしな気分は君のせい',
    },
  ],
  'char-chs': [
    { ccid: 1, cardId: 'card-chs-03-schl-00', nameJa: '課題クリア！' },
    { ccid: 2, cardId: 'card-chs-04-casl-00', nameJa: '昼下がりのお買いもの' },
    { ccid: 3, cardId: 'card-chs-05-idol-00', nameJa: '照度を増す自信' },
    {
      ccid: 4,
      cardId: 'card-chs-05-seik-00',
      nameJa: '一夜限りの聖なるステージ',
    },
    { ccid: 5, cardId: 'card-chs-02-eve-01', nameJa: '賑やかなお正月' },
    { ccid: 6, cardId: 'card-chs-05-rock-00', nameJa: 'ひと握りの勇気' },
    {
      ccid: 7,
      cardId: 'card-chs-05-chsk-00',
      nameJa: '絆溢れるクリエーション',
    },
  ],
  'char-hrk': [
    {
      ccid: 1,
      cardId: 'card-hrk-02-eve-01',
      nameJa: '図らずもバースデーライブ',
    },
    { ccid: 2, cardId: 'card-hrk-03-schl-00', nameJa: '後輩思いのお姉さん' },
    { ccid: 3, cardId: 'card-hrk-04-casl-00', nameJa: '全力タイムセール' },
    { ccid: 4, cardId: 'card-hrk-05-idol-00', nameJa: 'とても頼れるお姉さん' },
    { ccid: 5, cardId: 'card-hrk-05-mizg-01', nameJa: '恵みのサニーシャワー' },
    {
      ccid: 6,
      cardId: 'card-hrk-05-xmas-00',
      nameJa: '二人きり、冬夜の打ち上げ',
    },
    { ccid: 7, cardId: 'card-hrk-05-chna-00', nameJa: '解き放たれる十七歳' },
    { ccid: 8, cardId: 'card-hrk-05-idol-03', nameJa: '私、決めたよ' },
  ],
  'char-kkr': [
    { ccid: 1, cardId: 'card-kkr-03-schl-00', nameJa: 'たまには本気で' },
    { ccid: 2, cardId: 'card-kkr-04-casl-00', nameJa: '無邪気ないたずらっ子' },
    { ccid: 3, cardId: 'card-kkr-05-idol-00', nameJa: '新生リズノワの誇り' },
    { ccid: 4, cardId: 'card-kkr-05-seik-00', nameJa: '私は私' },
    {
      ccid: 5,
      cardId: 'card-kkr-05-vlnt-00',
      nameJa: 'ビタースイートメモリーズ',
    },
  ],
  'char-ktn': [
    { ccid: 1, cardId: 'card-ktn-02-casl-00', nameJa: '出発の時' },
    { ccid: 2, cardId: 'card-ktn-03-schl-00', nameJa: '見なれた光景' },
    { ccid: 3, cardId: 'card-ktn-04-casl-00', nameJa: 'センチメンタルな午後' },
    { ccid: 4, cardId: 'card-ktn-05-idol-00', nameJa: 'イノセントステージ' },
    { ccid: 5, cardId: 'card-ktn-05-mizg-01', nameJa: 'はにかみサマームーン' },
    { ccid: 6, cardId: 'card-ktn-05-fest-00', nameJa: '光華霜夜' },
    {
      ccid: 7,
      cardId: 'card-ktn-02-eve-01',
      nameJa: '誰にも負けないくらい好き',
    },
  ],
  'char-mei': [
    { ccid: 1, cardId: 'card-mei-03-schl-00', nameJa: 'バランス感覚UP' },
    { ccid: 2, cardId: 'card-mei-04-casl-00', nameJa: 'メイクアップタ～イム' },
    { ccid: 3, cardId: 'card-mei-05-idol-00', nameJa: 'カメラ越しの笑顔' },
    {
      ccid: 4,
      cardId: 'card-mei-05-mizg-01',
      nameJa: '二人きりのサンセットビーチ',
    },
    { ccid: 5, cardId: 'card-mei-05-rock-00', nameJa: 'いつかまた一緒に' },
    {
      ccid: 6,
      cardId: 'card-mei-05-fest-00',
      nameJa: '一人のアイドルとの出会い',
    },
  ],
  'char-mna': [
    { ccid: 1, cardId: 'card-mna-05-idol-00', nameJa: "You're my everything" },
    { ccid: 2, cardId: 'card-mna-05-fest-00', nameJa: 'ただ、手を繋ぐだけ' },
  ],
  'char-ngs': [
    { ccid: 1, cardId: 'card-ngs-03-schl-00', nameJa: '背中を追って' },
    { ccid: 2, cardId: 'card-ngs-04-casl-00', nameJa: 'おひさまダイアリー' },
    { ccid: 3, cardId: 'card-ngs-05-idol-00', nameJa: '背中をあずけて' },
    {
      ccid: 4,
      cardId: 'card-ngs-05-mizg-01',
      nameJa: '光踊る砂浜のメッセージ',
    },
    { ccid: 5, cardId: 'card-ngs-05-flow-00', nameJa: 'この瞬間の主役' },
    { ccid: 6, cardId: 'card-ngs-05-akma-00', nameJa: 'いたずら好きな小悪魔' },
    { ccid: 7, cardId: 'card-ngs-02-eve-01', nameJa: '姉妹の活躍に染められて' },
  ],
  'char-rei': [
    { ccid: 1, cardId: 'card-rei-03-schl-00', nameJa: '夜の自主トレ' },
    { ccid: 2, cardId: 'card-rei-04-casl-00', nameJa: '密かなお楽しみ' },
    { ccid: 3, cardId: 'card-rei-05-idol-00', nameJa: '高台をかける薫風' },
    { ccid: 4, cardId: 'card-rei-05-rock-00', nameJa: '失敗なんて恐れない' },
    { ccid: 5, cardId: 'card-rei-02-eve-01', nameJa: 'ココロ Distance' },
    {
      ccid: 6,
      cardId: 'card-rei-05-newy-00',
      nameJa: '絶対秘密のバックステージ',
    },
    { ccid: 7, cardId: 'card-rei-05-onep-00', nameJa: '花あかり誘う笑顔' },
  ],
  'char-rio': [
    { ccid: 1, cardId: 'card-rio-01-casl-00', nameJa: '雨の中の帰路' },
    {
      ccid: 2,
      cardId: 'card-rio-02-eve-01',
      nameJa: '心引き締まるレッスン合宿',
    },
    { ccid: 3, cardId: 'card-rio-03-schl-00', nameJa: '折れない心' },
    { ccid: 4, cardId: 'card-rio-04-casl-00', nameJa: 'スイーツライフ' },
    {
      ccid: 5,
      cardId: 'card-rio-05-halw-00',
      nameJa: 'その魅力、モンスター級',
    },
    { ccid: 6, cardId: 'card-rio-05-idol-00', nameJa: '空気を震わせて' },
    { ccid: 7, cardId: 'card-rio-05-fest-00', nameJa: '奇跡より必然' },
    { ccid: 8, cardId: 'card-rio-02-eve-02', nameJa: '緊張の一瞬' },
    { ccid: 9, cardId: 'card-rio-05-kait-00', nameJa: '憧憬のアクター' },
  ],
  'char-rui': [
    { ccid: 1, cardId: 'card-rui-01-casl-00', nameJa: '夕暮れのホームで' },
    { ccid: 2, cardId: 'card-rui-03-schl-00', nameJa: '秘密会議' },
    { ccid: 3, cardId: 'card-rui-04-casl-00', nameJa: 'ほっと帰り道' },
    { ccid: 4, cardId: 'card-rui-05-idol-00', nameJa: 'ありのままの姿で' },
    {
      ccid: 5,
      cardId: 'card-rui-05-mizg-01',
      nameJa: '真夏の恥じらいショット',
    },
    {
      ccid: 6,
      cardId: 'card-rui-05-xmas-00',
      nameJa: '白息はずむホーリーナイト',
    },
    { ccid: 7, cardId: 'card-rui-02-eve-01', nameJa: '対等な関係' },
    {
      ccid: 8,
      cardId: 'card-rui-05-date-00',
      nameJa: '緑風誘うデートスポット',
    },
  ],
  'char-ski': [
    { ccid: 1, cardId: 'card-ski-02-mizg-01', nameJa: '夏の夜に輝く星' },
    { ccid: 2, cardId: 'card-ski-03-schl-00', nameJa: '早朝猛特訓' },
    { ccid: 3, cardId: 'card-ski-04-casl-00', nameJa: 'もふもふショッピング' },
    { ccid: 4, cardId: 'card-ski-05-idol-00', nameJa: '手を取り合って' },
    { ccid: 5, cardId: 'card-ski-05-kifj-00', nameJa: '涙のカーテンコール' },
    { ccid: 6, cardId: 'card-ski-05-waso-00', nameJa: '胸に秘めていた情熱' },
    {
      ccid: 7,
      cardId: 'card-ski-05-chsk-00',
      nameJa: '絆深まる姉妹のステージ',
    },
  ],
  'char-skr': [
    { ccid: 1, cardId: 'card-skr-02-casl-00', nameJa: '夜空に咲く花' },
    { ccid: 2, cardId: 'card-skr-03-schl-00', nameJa: '元気100倍！' },
    { ccid: 3, cardId: 'card-skr-04-casl-00', nameJa: 'ジューシーランチ' },
    {
      ccid: 4,
      cardId: 'card-skr-05-fest-00',
      nameJa: 'あなたの光になれるように',
    },
    { ccid: 5, cardId: 'card-skr-05-idol-00', nameJa: '夢の共演' },
    {
      ccid: 6,
      cardId: 'card-skr-05-newy-00',
      nameJa: '笑う門には福来るだよ！',
    },
    { ccid: 7, cardId: 'card-skr-05-idol-03', nameJa: 'この指とーまれ！' },
  ],
  'char-smr': [
    { ccid: 1, cardId: 'card-smr-03-schl-00', nameJa: '努力のたまもの' },
    { ccid: 2, cardId: 'card-smr-04-casl-00', nameJa: 'ギリギリセーフ' },
    { ccid: 3, cardId: 'card-smr-05-idol-00', nameJa: '小さなヒロイン' },
    { ccid: 4, cardId: 'card-smr-05-mizg-01', nameJa: '常夏ウォーターパーク' },
    { ccid: 5, cardId: 'card-smr-05-xmas-00', nameJa: '六花イルミネーション' },
    { ccid: 6, cardId: 'card-smr-05-frut-00', nameJa: 'Little lover' },
  ],
  'char-suz': [
    { ccid: 1, cardId: 'card-suz-03-schl-00', nameJa: 'へろへろランニング' },
    { ccid: 2, cardId: 'card-suz-04-casl-00', nameJa: 'わくわくクッキング' },
    { ccid: 3, cardId: 'card-suz-05-idol-00', nameJa: 'パワフルガール' },
    {
      ccid: 4,
      cardId: 'card-suz-05-mizg-01',
      nameJa: 'ほろにがサマーメモリーズ',
    },
    {
      ccid: 5,
      cardId: 'card-suz-05-anml-00',
      nameJa: '撮れ高たっぷりショット',
    },
    { ccid: 6, cardId: 'card-suz-02-eve-01', nameJa: '期待で胸いっぱい' },
    {
      ccid: 7,
      cardId: 'card-suz-05-onep-00',
      nameJa: '背伸びをしても、届かない',
    },
  ],
  'char-szk': [
    { ccid: 1, cardId: 'card-szk-02-mizg-01', nameJa: 'ぷかぷかリゾート' },
    { ccid: 2, cardId: 'card-szk-03-schl-00', nameJa: 'つかの間の休息' },
    { ccid: 3, cardId: 'card-szk-04-casl-00', nameJa: '潜入、ドームツアー' },
    { ccid: 4, cardId: 'card-szk-05-idol-00', nameJa: '光の波' },
    { ccid: 5, cardId: 'card-szk-05-chna-00', nameJa: '夢は、きっと叶う' },
    { ccid: 6, cardId: 'card-szk-05-yuru-00', nameJa: '一緒に歌える幸せ' },
    { ccid: 7, cardId: 'card-szk-02-eve-01', nameJa: 'みんなのピースを' },
  ],
  'char-yu': [
    { ccid: 1, cardId: 'card-yu-03-schl-00', nameJa: '自主トレ日和' },
    { ccid: 2, cardId: 'card-yu-04-casl-00', nameJa: '至福の時間' },
    { ccid: 3, cardId: 'card-yu-05-idol-00', nameJa: '白の衝撃' },
    { ccid: 4, cardId: 'card-yu-05-mizg-01', nameJa: '秘密のフォトセッション' },
    { ccid: 5, cardId: 'card-yu-05-xmas-00', nameJa: 'うちらのクリスマスイブ' },
  ],
}

type CCIDTableType = Record<CharacterId, { ccid: number; cardId: string }[]>

const CCIDTable = Object.entries(CCIDTableWithName)
  .map(([key, value]) => ({
    key,
    value: value.map(({ ccid, cardId }) => ({ ccid, cardId })),
  }))
  .reduce(
    (prev, { key, value }) => ({ ...prev, [key]: value }),
    {}
  ) as CCIDTableType

export default CCIDTable
