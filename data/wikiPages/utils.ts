/* eslint-disable @typescript-eslint/no-explicit-any */

import { existsSync, readFileSync } from 'node:fs'

import wtfWp from 'wtf_wikipedia'

export type SitePrefConfig = {
    domain: string
    path: string
}

export function mapProps(
    mapper: Record<string, string>,
    options: { allRequired?: boolean } = {},
) {
    const { allRequired } = options ?? {}
    const retFn = (obj: Record<string, any>) => {
        const ret: Record<string, string> = {}
        for (const [key, val] of Object.entries(mapper)) {
            const target = obj[val]
            if (target === undefined && allRequired) {
                console.error(`Property ${val} is not found`)
            }
            ret[key] = target ?? 'TODO'
        }
        return ret
    }

    return retFn
}

export async function fetchPrefixList(
    prefix: string,
    sitePref: SitePrefConfig,
) {
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
    return await fetch(url)
        .then((x) => x.json())
        .then((x: any) => x.query.allpages.map((y: any) => y.title))
}

export async function getPageJson(pageName: string, sitePref: SitePrefConfig) {
    return wtfWp
        .fetch(pageName, sitePref)
        .then((x) => (Array.isArray(x) ? x[0].json() : x?.json()))
}

export function readJson(jsonFilename: string) {
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

export function sleep(time: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}

export function isRegExp(r: any): r is RegExp {
    // https://github.com/sindresorhus/is-regexp/blob/main/index.js
    return Object.prototype.toString.call(r) === '[object RegExp]'
}
