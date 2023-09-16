#!/usr/bin/env ts-node
/* eslint-disable @typescript-eslint/no-explicit-any */

import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import {
    fetchPrefixList,
    getPageJson,
    mapProps,
    readJson,
    sleep,
} from './utils.js'
import type { SitePrefConfig } from './utils.js'

import type { CharacterId } from '#data/vendor/characterId.js'

const CharacterChineseNameList: Record<CharacterId, string> = {
    'char-ktn': '长濑琴乃',
    'char-ngs': '伊吹渚',
    'char-ski': '白石沙季',
    'char-suz': '成宫铃',
    'char-mei': '早坂芽衣',
    'char-skr': '川咲樱',
    'char-szk': '兵藤雫',
    'char-chs': '白石千纱',
    'char-rei': '一之濑怜',
    'char-hrk': '佐伯遥子',
    'char-rui': '天动瑠依',
    'char-yu': '铃村优',
    'char-smr': '奥山堇',
    'char-rio': '神崎莉央',
    'char-aoi': '井川葵',
    'char-ai': '小美山爱',
    'char-kkr': '赤崎心',
    'char-mna': '长濑麻奈',
    'char-kor': 'fran',
    'char-kan': 'kana',
    'char-mhk': 'miho',
    'char-mku': '初音未来',
} as const

const CardsJson = 'cards.json'
const SongsJson = 'songs.json'
const CardsCnTransJson = '../../locales/zh-Hans/v-card-name.json'
const SitePref: SitePrefConfig = {
    domain: 'wiki.biligame.com',
    path: 'idolypride/api.php',
}

function findFirstTemplateWithName(pageJson: any, templateName: string) {
    return pageJson.sections
        .map((x: any) => x.templates ?? [])
        .reduce((a: any, b: any) => [...a, ...b])
        .filter((x: any) => x.template === templateName)?.[0]
}

function parseSong(pageJson: any) {
    const infoTemplate = findFirstTemplateWithName(pageJson, '歌曲/主页面')
    return {
        ...mapProps(
            {
                name: '歌名',
                slug: '简称',
                lyricist: '作词',
                composer: '作曲',
                arranger: '编曲',
                lyrics: '歌词',
            },
            { allRequired: true },
        )(infoTemplate),
        ...mapProps({
            bvid: 'bv号',
            pid: '分p号',
        })(infoTemplate),
    }
}

function parseCard(pageJson: any) {
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
            { allRequired: true },
        )(infoTemplate),
        ...mapProps({
            eruNameCn: '应援技能名',
            eruDescCn: '应援技能说明',
            eruNameJa: '应援技能日文名',
            eruDescJa: '应援技能日文说明',
        })(infoTemplate),
    }
}

function parseIdol(pageJson: any) {
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
        },
    )(infoTemplate)
}

async function main() {
    const currDir = fileURLToPath(dirname(import.meta.url))

    try {
        // Cards
        const cardInfo = readJson(join(currDir, CardsJson))
        const cardCnTrans = readJson(join(currDir, CardsCnTransJson))
        for (const [idolId, idolCnName] of Object.entries(
            CharacterChineseNameList,
        )) {
            console.info(`Fetching cards for ${idolCnName}`)
            const pagePrefix = `${idolCnName}/卡牌/`
            const pageNames = await fetchPrefixList(pagePrefix, SitePref)
            for (const cardName of pageNames) {
                const cardId = cardName.replace(
                    new RegExp(`^${pagePrefix}`),
                    '',
                )
                if (cardInfo?.[idolId]?.[cardId]) {
                    console.info(`Skipping card ${cardName}`)
                    continue
                }
                console.info(`Fetching card ${cardName}`)
                const pageJson = await getPageJson(cardName, SitePref)
                const cardMeta: Record<string, number | string> =
                    parseCard(pageJson)
                for (const i of [
                    'rarity',
                    'vocTop',
                    'danTop',
                    'staTop',
                    'visTop',
                ]) {
                    cardMeta[i] = Number(cardMeta[i])
                }
                cardMeta.ownerSlug = idolId
                cardMeta.ownerId = Number(cardId)
                ;(cardInfo[idolId] || (cardInfo[idolId] = {}))[cardId] =
                    cardMeta
                cardCnTrans[cardMeta.nameJa] = cardMeta.nameCn
            }
            writeFileSync(join(currDir, CardsJson), JSON.stringify(cardInfo))
            writeFileSync(
                join(currDir, CardsCnTransJson),
                JSON.stringify(cardCnTrans),
            )
            await sleep(3000)
        }
    } catch (e) {
        console.error(`Failed to update card data: ${e}`)
    }

    try {
        // Songs
        const songInfo = readJson(join(currDir, SongsJson))
        const pageNames = await fetchPrefixList('歌曲/', SitePref)
        for (const songName of pageNames) {
            if (songInfo?.[songName]) {
                console.info(`Skipping song ${songName}`)
                continue
            }
            console.info(`Fetching song ${songName}`)
            const pageJson = await getPageJson(songName, SitePref)
            const songMeta = parseSong(pageJson)
            songInfo[songName] = songMeta
        }
        writeFileSync(join(currDir, SongsJson), JSON.stringify(songInfo))
    } catch (e) {
        console.error(`Failed to update song data: ${e}`)
    }
}

main()
