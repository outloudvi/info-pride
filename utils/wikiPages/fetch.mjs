import { writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import {
  fetchPrefixList,
  getPageJson,
  mapProps,
  readJson,
  sleep,
} from './utils.mjs'

const IdolsJson = 'idols.json'
const CardsJson = 'cards.json'
const SitePref = {
  domain: 'wiki.biligame.com',
  path: 'idolypride/api.php',
}
const IdolNames = [
  '长濑麻奈',
  // SunnyP
  '川咲樱',
  '一之濑怜',
  '佐伯遥子',
  '白石千纱',
  '兵藤雫',
  // Tsuki
  '长濑琴乃',
  '伊吹渚',
  '白石沙季',
  '成宫铃',
  '早坂芽衣',
  // TRiLE
  '天动瑠依',
  '铃村优',
  '奥山堇',
  // LizNoir
  '神崎莉央',
  '井川葵',
  '小美山爱',
  '赤崎心',
]

function findFirstTemplateWithName(pageJson, templateName) {
  return pageJson.sections
    .map((x) => x.templates ?? [])
    .reduce((a, b) => [...a, ...b])
    .filter((x) => x.template === templateName)?.[0]
}

function parseCard(pageJson) {
  const infoTemplate =
    findFirstTemplateWithName(pageJson, '角色/卡牌详细') ??
    findFirstTemplateWithName(pageJson, '角色/卡牌详细1')
  return {
    ...mapProps(
      {
        nameCn: '卡牌名中文',
        nameJa: '卡牌名日文',
        type: '类别',
        prop: '属性',
        rarity: '初期稀有度',
        vocTop: '属性歌唱数值',
        danTop: '属性舞蹈数值',
        visTop: '属性表演数值',
        staTop: '属性体力数值',
        ski1Typ: '演出技能类别1',
        ski1NameCn: '演出技能名1',
        ski1DescCn: '演出技能说明1',
        ski1NameJa: '演出技能日文名1',
        ski1DescJa: '演出技能日文说明1',
        ski2Typ: '演出技能类别2',
        ski2NameCn: '演出技能名2',
        ski2DescCn: '演出技能说明2',
        ski2NameJa: '演出技能日文名2',
        ski2DescJa: '演出技能日文说明2',
        ski3Typ: '演出技能类别3',
        ski3NameCn: '演出技能名3',
        ski3DescCn: '演出技能说明3',
        ski3NameJa: '演出技能日文名3',
        ski3DescJa: '演出技能日文说明3',
      },
      { allRequired: true }
    )(infoTemplate),
    ...mapProps({
      eruNameCn: '应援技能名',
      eruDescCn: '应援技能说明',
      eruNameJa: '应援技能日文名',
      eruDescJa: '应援技能日文说明',
    })(infoTemplate),
  }
}

function parseIdol(pageJson) {
  const infoTemplate = findFirstTemplateWithName(pageJson, '角色/基本资料')
  return mapProps(
    {
      nameJa: '日文名',
      nameCn: '中文名',
      birthday: '生日',
      team: '所属',
      cv: 'cv',
      desc: '简介',
    },
    {
      allRequired: true,
    }
  )(infoTemplate)
}

async function main() {
  const currDir = fileURLToPath(dirname(import.meta.url))

  // Idols
  const idolInfo = readJson(join(currDir, IdolsJson))
  for (const idolName of IdolNames) {
    if (idolInfo?.[idolName]) {
      console.info(`Skipping idol ${idolName}`)
      continue
    }
    console.info(`Fetching idol ${idolName}`)
    const pageJson = await getPageJson(idolName, SitePref)
    idolInfo[idolName] = parseIdol(pageJson)
  }
  writeFileSync(IdolsJson, JSON.stringify(idolInfo))

  // Cards
  const cardInfo = readJson(join(currDir, CardsJson))
  for (const idolName of IdolNames) {
    console.info(`Fetching cards for ${idolName}`)
    const pageNames = await fetchPrefixList(`${idolName}/卡牌/`, SitePref)
    for (const cardName of pageNames) {
      if (cardInfo?.[idolName]?.[cardName]) {
        console.info(`Skipping card ${cardName}`)
        continue
      }
      console.info(`Fetching card ${cardName}`)
      const pageJson = await getPageJson(cardName, SitePref)
      const cardMeta = parseCard(pageJson)
      for (const i of ['rarity', 'vocTop', 'danTop', 'staTop', 'visTop']) {
        cardMeta[i] = Number(cardMeta[i])
      }
      ;(cardInfo[idolName] || (cardInfo[idolName] = {}))[cardName] = cardMeta
    }
    writeFileSync(CardsJson, JSON.stringify(cardInfo))
    await sleep(3000)
  }
}

main()
