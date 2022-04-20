import { useState, useMemo, useEffect } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import Link from 'next/link'
import {
  Button,
  Checkbox,
  MultiSelect,
  Select,
  TextInput,
  Tooltip,
} from '@mantine/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { intersection, uniq } from 'lodash'

import Layout from '../components/Layout'
import CardDesc from '../components/CardDesc'

import { Cards, CardSkillsData } from '../utils/dataset'
import { ColorTypeSimple, IdentCT } from '../utils/wikiPages/types'
import type { Card } from '../utils/wikiPages/cards'
import { IdolNameList, IdolName, idolNameToSlug } from '../data/idols'
import { LocalBox, LOCALSTORAGE_BOX_TAG } from './settings'
import { tryJSONParse } from '../rtUtils'

function mergeHilights(
  h1: Record<string, number[]>,
  h2: Record<string, number[]>
): Record<string, number[]> {
  if (Object.keys(h1).length === 0) {
    // if h1 is empty: just use h2
    return h2
  }
  const ret: Record<string, number[]> = {}
  for (const i of Object.keys(h1)) {
    if (!h2[i]) continue
    ret[i] = intersection(h1[i], h2[i])
  }
  return ret
}

const FilterSelect = <T extends string>({
  label,
  state,
  setState,
  list,
  width,
  multiple,
  className,
  listNamemap,
}: {
  label: string
  state: T[]
  setState: Dispatch<SetStateAction<T[]>>
  list: T[]
  width: number
  multiple?: boolean
  className?: string
  listNamemap?: Record<string, string>
}) => {
  const data = listNamemap
    ? list.map((x) => ({
        label: listNamemap[x] ?? x,
        value: x,
      }))
    : list
  if (multiple) {
    return (
      <MultiSelect
        data={data}
        label={label}
        value={state}
        width={width}
        className={className}
        clearable
        onChange={(s: T[]) => {
          setState(s)
        }}
        classNames={{
          wrapper: 'max-w-xl',
        }}
      />
    )
  } else {
    return (
      <Select
        data={data}
        label={label}
        value={state[0]}
        width={width}
        className={className}
        clearable
        onChange={(s: T) => {
          setState([s])
        }}
      />
    )
  }
}

const CardsFlattened = Object.values(Cards)
  .map((x) => Object.values(x))
  .reduce((a, b) => [...a, ...b]) as Card[]

const SkillsFlattened = Object.values(CardSkillsData)
  .map((x) => Object.values(x))
  .map((x) =>
    x.map((y) => [y.ski1, y.ski2, y.ski3]).reduce((a, b) => [...a, ...b])
  )
  .reduce((a, b) => [...a, ...b])
  .reduce((a, b) => [...a, ...b])

const SkillTypeList = uniq(SkillsFlattened.map((x) => x.type))

const SkillesPage = () => {
  const [fKeyword, setfKeyword] = useState('')
  const [fIdol, setfIdol] = useState<IdolName[]>([])
  const [fColor, setfColor] = useState<ColorTypeSimple[]>([])
  const [fOwnedOnly, setfOwnedOnly] = useState<boolean>(false)
  const [fCtMin, setfCtMin] = useState(0)
  const [fCtMax, setfCtMax] = useState(0)
  const [fShowSp, setfShowSp] = useState(false)
  const [fType, setfType] = useState<string[]>([])
  const [fSubtype, setfSubtype] = useState<string[]>([])

  const [localBox, setLocalBox] = useState<LocalBox>({})

  const [selectedCards, highlightCards] = useMemo(() => {
    let highlights: Record<string, number[]> = {}
    let ret = CardsFlattened
    if (fKeyword !== '') {
      ret = ret.filter((x) => JSON.stringify(x).includes(fKeyword))
    }
    if (fIdol.filter((x) => x).length > 0) {
      ret = ret.filter((x) => fIdol.includes(x.ownerName as IdolName))
    }
    if (fColor.filter((x) => x).length > 0) {
      const mappedGroup = fColor.map(
        (x) =>
          ({
            [ColorTypeSimple.Vocal]: '歌唱',
            [ColorTypeSimple.Dance]: '舞蹈',
            [ColorTypeSimple.Visual]: '表演',
          }[x])
      )
      ret = ret.filter((x) => mappedGroup.includes(x.prop))
    }
    if (fOwnedOnly) {
      ret = ret.filter((x) =>
        Boolean(localBox?.[idolNameToSlug(x.ownerName)!]?.[x.ownerId])
      )
    }

    // Skill-related part
    if (fCtMin > 0 || fCtMax > 0) {
      const localHighlights: Record<string, number[]> = {}
      const ctMin = fCtMin > 0 ? fCtMin : 0
      const ctMax = fCtMax > 0 ? fCtMax : Infinity

      ret = ret.filter((x) => {
        const skillList = CardSkillsData[x.ownerName][x.ownerId]
        const skills = [skillList.ski1, skillList.ski2, skillList.ski3]
        let showThisCard = false

        const cardKey = `${x.ownerName}/${x.ownerId}`
        localHighlights[cardKey] = []
        for (const [key, idents] of skills.entries()) {
          const ctEntry = idents.filter((x) => x.type === 'ct') as IdentCT[]
          if (ctEntry.length > 0) {
            const ct = ctEntry[0].ct
            if (ct >= ctMin && ct <= ctMax) {
              showThisCard = true
              localHighlights[cardKey].push(key)
            }
          } else {
            // no cp -> a SP skill
            // if type is selected: get it shown
            showThisCard = fShowSp
          }
        }
        return showThisCard
      })
      highlights = mergeHilights(highlights, localHighlights)
    }

    if (fType.filter((x) => x).length > 0) {
      const currFType = fType[0]
      const localHighlights: Record<string, number[]> = {}
      ret = ret.filter((x) => {
        const skillList = CardSkillsData[x.ownerName][x.ownerId]
        const skills = [skillList.ski1, skillList.ski2, skillList.ski3]
        let showThisCard = false
        const cardKey = `${x.ownerName}/${x.ownerId}`
        localHighlights[cardKey] = []
        for (const [key, idents] of skills.entries()) {
          if (idents.filter((x) => currFType === x.type).length > 0) {
            showThisCard = true
            localHighlights[cardKey].push(key)
          }
        }
        return showThisCard
      })
      highlights = mergeHilights(highlights, localHighlights)
    }

    if (fSubtype.filter((x) => x).length > 0) {
      const currFType = fType[0]
      const currFSubtype = fSubtype[0]
      const localHighlights: Record<string, number[]> = {}
      ret = ret.filter((x) => {
        const skillList = CardSkillsData[x.ownerName][x.ownerId]
        const skills = [skillList.ski1, skillList.ski2, skillList.ski3]
        let showThisCard = false
        const cardKey = `${x.ownerName}/${x.ownerId}`
        localHighlights[cardKey] = []
        for (const [key, idents] of skills.entries()) {
          const maybeLinkedTypeIdents = idents.filter(
            (x) => currFType === x.type
          )
          if (maybeLinkedTypeIdents.length > 0) {
            const linkedTypeIdent = maybeLinkedTypeIdents[0]
            // @ts-expect-error
            if (String(linkedTypeIdent[currFType]) === currFSubtype) {
              showThisCard = true
              localHighlights[cardKey].push(key)
            }
          }
        }
        return showThisCard
      })
      highlights = mergeHilights(highlights, localHighlights)
    }

    return [ret, highlights]
  }, [
    fKeyword,
    fIdol,
    fColor,
    fOwnedOnly,
    localBox,
    fCtMin,
    fCtMax,
    fShowSp,
    fType,
    fSubtype,
  ])

  const fSubTypeDesc = useMemo(() => {
    if (fType.length === 0) return []
    const typeName = fType[0]

    const possibleValues = uniq(
      SkillsFlattened.filter((x) => x.type === typeName).map(
        // @ts-expect-error
        (x) => x[typeName] as string | number
      )
    )
      .map(String)
      .sort()

    return possibleValues.length <= 25 ? possibleValues : []
  }, [fType])

  useEffect(() => {
    setLocalBox(tryJSONParse(localStorage.getItem(LOCALSTORAGE_BOX_TAG)))
  }, [])

  return (
    <Layout>
      <h2>卡片搜索</h2>
      <p>
        如果发现自己持有的卡片没有显示为「已持有」，请
        <Link href="/settings">更新卡片持有状态</Link>。
      </p>
      <div className="mt-2 rounded-md border-solid border-6 border-sky-500 p-2">
        <div className="flex items-center mb-2">
          <TextInput
            className="mr-2"
            label="关键词"
            value={fKeyword}
            multiple
            onChange={(e) => {
              setfKeyword(e.target.value)
            }}
          />
          <FilterSelect
            className="mr-2"
            label="角色"
            state={fIdol}
            setState={setfIdol}
            multiple
            list={IdolNameList}
            width={300}
          />
          <FilterSelect
            className="mr-2"
            label="类型"
            state={fColor}
            setState={setfColor}
            multiple
            list={['Vocal', 'Dance', 'Visual'] as ColorTypeSimple[]}
            width={200}
          />
          <Checkbox
            label="只显示已持有的卡片"
            checked={fOwnedOnly}
            onChange={(e) => {
              setfOwnedOnly(e.target.checked)
            }}
          />
        </div>
        <div className="flex items-center mb-2">
          <TextInput
            className="mr-2"
            label="CT 最小值"
            type="number"
            value={fCtMin}
            onChange={(e) => {
              const v = Number(e.target.value)
              if (Number.isNaN(v)) return
              setfCtMin(v)
            }}
          />
          <TextInput
            className="mr-2"
            label="CT 最大值"
            placeholder="无限制"
            type="number"
            value={fCtMax}
            onChange={(e) => {
              const v = Number(e.target.value)
              if (Number.isNaN(v)) return
              setfCtMax(v)
            }}
          />
          <Checkbox
            label="按 CT 值筛选时不要跳过 SP 技能"
            checked={fShowSp}
            onChange={(e) => {
              setfShowSp(e.target.checked)
            }}
            className="mr-2"
          />
          <Tooltip label="选择此选项时，即使卡片的其它技能均不满足 CT 筛选要求，有 SP 技能的卡片也会被显示。如果同时附加了其它筛选条件，您可能希望勾选此项。">
            <FontAwesomeIcon icon={faInfoCircle} />
          </Tooltip>
        </div>
        <div className="flex items-center mb-2">
          <FilterSelect
            className="mr-2"
            label="技能类别"
            state={fType}
            setState={(v) => {
              setfType(v)
              setfSubtype([])
            }}
            list={SkillTypeList}
            width={300}
            listNamemap={{
              ct: '[属性] 所需 CT',
              staminaCost: '[属性] 所需体力',
              limit: '[属性] 限制',
              when: '[属性] 发动时间',
              scoreMultiply: '[效果] 分数倍数',
              giveStatus: '[效果] 赋予状态',
              stamRecovery: '[效果] 体力回复',
              ctDecrease: '[效果] CT 降低',
              giveRivalStatus: '[效果] 赋予对手状态',
              move: '[效果] 转移发动时机',
            }}
          />
          <FilterSelect
            label="技能子类别"
            state={fSubtype}
            setState={setfSubtype}
            list={fSubTypeDesc}
            width={300}
            listNamemap={{
              undefined: '其它',
              once: '只发动一次',
              length: '长度限制',
              percent: '按比例',
              value: '按值',
              beforeSP: '到 SP 技能前',
              Invisible: '隐身',
              Focused: '集目',
              BadCond: '不调',
              NegRecover: '低下状态回复',
              NoNegative: '低下状态防止',
              EnhanceExtend: '强化状态延长',
              EnhanceStrengthen: '强化状态增强',
              HighSpirits: '气氛高昂',
              BeatScoring: '节拍得分提升',
              ScoringUp: '得分提升',
              CritCoefUp: '暴击系数提升',
              CritRateUp: '暴击率提升',
              StamDraiUp: '体力消耗提升',
              StamDraiDn: '体力消耗降低',
              SkilSuccUp: '技能成功率提升',
              CombScorUp: '连击得分提升',
              NoBreak: '连击接续',
              AScorUp: 'A 技能得分提升',
              VocalUp: 'Vocal 属性提升',
              DanceUp: 'Dance 属性提升',
              VisualUp: 'Visual 属性提升',
              VocalDn: 'Vocal 属性下降',
              DanceDn: 'Dance 属性下降',
              VisualDn: 'Visual 属性下降',
            }}
          />
        </div>
        <div>
          <Button
            onClick={() => {
              setfKeyword('')
              setfIdol([])
              setfColor([])
              setfCtMin(0)
              setfCtMax(0)
              setfType([])
              setfSubtype([])
            }}
          >
            清空条件
          </Button>
        </div>
      </div>
      <div className="mt-2">
        从 {CardsFlattened.length} 张卡片中找到 {selectedCards.length} 个结果。
        {Object.keys(highlightCards).length > 0 &&
          '被筛选的技能已经以高亮背景标记。'}
      </div>
      <div className="mt-2">
        {selectedCards.map((item, key) => (
          <CardDesc
            key={key}
            card={item}
            owned={Boolean(
              localBox?.[idolNameToSlug(item.ownerName)!]?.[item.ownerId]
            )}
            highlightSkills={
              highlightCards[`${item.ownerName}/${item.ownerId}`] ?? []
            }
          />
        ))}
      </div>
    </Layout>
  )
}

export default SkillesPage
