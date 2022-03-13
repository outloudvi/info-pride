import got from 'got'
import wtfWp from 'wtf_wikipedia'
import { existsSync, readFileSync } from 'fs'

export function mapProps(mapper, options) {
  const { allRequired } = options ?? {}
  const retFn = (obj) => {
    const ret = {}
    for (const [key, val] of Object.entries(mapper)) {
      const target = obj[val]
      if (target === undefined && allRequired) {
        throw Error(`Property ${val} is not found`)
      }
      ret[key] = target
    }
    return ret
  }

  return retFn
}

export async function fetchPrefixList(prefix, sitePref) {
  const url = new URL(`https://${sitePref.domain}`)
  url.pathname = sitePref.path
  for (const [key, value] of [
    ['action', 'query'],
    ['format', 'json'],
    ['list', 'allpages'],
    ['apprefix', prefix],
    ['aplimit', 'max'],
  ]) {
    url.searchParams.set(key, value)
  }
  return await got
    .get(url, {
      responseType: 'json',
    })
    .json()
    .then((x) => x.query.allpages.map((y) => y.title))
}

export async function getPageJson(pageName, sitePref) {
  return wtfWp
    .fetch(pageName, sitePref)
    .then((x) => (Array.isArray(x) ? x[0].json() : x?.json()))
}

export function readJson(jsonFilename) {
  if (existsSync(jsonFilename)) {
    console.log(`Reading from ${jsonFilename}`)
    try {
      return JSON.parse(readFileSync(jsonFilename, 'utf-8'))
    } catch (err) {
      console.error('Failed to process file:', err)
    }
  } else {
    console.log(`${jsonFilename} not found, starting from scratch`)
  }
  return {}
}

export function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}
