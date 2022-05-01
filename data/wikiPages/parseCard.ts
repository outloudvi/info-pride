#!/usr/bin/env ts-node

import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

import { isRegExp } from './utils.js'
import { Matchers } from './parserIdentifier.js'
import ReplaceTable from './parserReplaceTable.js'
import type { Matcher, MatchQuery } from './types.js'

import { Cards } from './index.js'

type keyIdols = keyof typeof Cards
let err = 0
let total = 0
const matcherStatus: Record<number, number> = {}

function applyMatchQuery(
  text: string,
  mq: MatchQuery,
  lastIndex: number
): [string | null, Record<string, any>, number] | null {
  if (typeof mq === 'string') {
    const index = text.indexOf(mq, lastIndex)
    if (index !== -1) return [mq, {}, index + mq.length]
    return null
  } else if (isRegExp(mq)) {
    const match = text.slice(lastIndex).match(mq)
    if (match === null) return null
    return [
      match[1],
      match.groups ?? {},
      lastIndex + match.index! + match[0].length,
    ]
  }
  return null
}

function applyMatcher(
  text: string,
  matcher: Matcher,
  debug: boolean = false
): Record<string, any> | null {
  const { spec, body } = matcher
  let lastIndex = 0
  let data: Record<string, string> = {}
  for (const specItem of spec) {
    if (Array.isArray(specItem)) {
      // set-value
      const [key, mqs] = specItem
      let ok = false
      // one success -> OK!
      for (const mq of mqs) {
        const ret = applyMatchQuery(text, mq, lastIndex)
        if (ret !== null && ret[2] > lastIndex) {
          lastIndex = ret[2]
          ok = true
          if (ret[0]) data[key] = ret[0]
          data = {
            ...data,
            ...ret[1],
          }
          break
        }
      }
      if (!ok) {
        // set-value failed, exit
        if (debug) {
          console.info(`Failed [matchGroup]: ${specItem}`)
        }
        return null
      }
    } else {
      // check
      const ret = applyMatchQuery(text, specItem, lastIndex)
      if (ret === null || ret[2] <= lastIndex) {
        // check failed, exit
        if (debug) {
          console.info(`Failed [match]: ${specItem}`)
        }
        return null
      }
      lastIndex = ret[2]
      data = {
        ...data,
        ...ret[1],
      }
      // otherwise, continue
    }
  }

  return body(data)
}

function parseSkill(__s: string) {
  let _s = __s
  for (const [_, [fr, to]] of ReplaceTable.entries()) {
    _s = _s.replace(isRegExp(fr) ? fr : new RegExp(fr, 'g'), to)
  }
  const s = _s
    .replace(/\[(\d+)拍\]/g, ' [$1拍]')
    .replaceAll('[对决演出]', '对决演出时 ')
    .replace(/在?对决演出时，?/g, '对决演出时 ')
    // it should be at the end
    .replace(/[\n 、·]+/g, ' ')
    .split(' ')
  total += s.length
  const rets = []
  for (const part of s) {
    // a part
    let ret = null
    for (const [index, matcher] of Matchers.entries()) {
      ret = applyMatcher(part, matcher)
      if (ret !== null) {
        matcherStatus[index] = (matcherStatus[index] ?? 0) + 1
        break
      }
    }

    if (ret === null) {
      // no matchers worked
      console.log(part)
      err++
    } else {
      // match OK!
      rets.push(ret)
    }
  }

  return rets
}

function main() {
  const currDir = fileURLToPath(dirname(import.meta.url))
  // Don't get the type serious here; build the complete type in the schema
  const obj: Partial<Record<keyIdols, Record<string, Record<string, any>>>> = {}
  for (const idolSlug of Object.keys(Cards) as keyIdols[]) {
    for (const cardSlug of Object.keys(Cards[idolSlug])) {
      const card = Cards[idolSlug][cardSlug as any]
      const ret: Record<string, any> = {}

      if (card.ski1DescCn) ret.ski1 = parseSkill(card.ski1DescCn)
      if (card.ski2DescCn) ret.ski2 = parseSkill(card.ski2DescCn)
      if (card.ski3DescCn) ret.ski3 = parseSkill(card.ski3DescCn)
      ;(obj[idolSlug] || (obj[idolSlug] = {}))[cardSlug] = ret
    }
  }
  writeFileSync(join(currDir, 'cardSkills.json'), JSON.stringify(obj))
}

main()
console.log(`Total ${total}, skipped ${err}`)
