import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

import locales from '../locales/locales.json' assert { type: 'json' }

const __dirname = dirname(new URL(import.meta.url).pathname)
const basedir = join(__dirname, '../locales')

function getFileKeys(path) {
    try {
        return Object.keys(JSON.parse(readFileSync(path)))
    } catch (_) {
        return null
    }
}

function arrayEq(arr, base) {
    if (arr.length !== base.length) {
        console.warn('[WARN] Different length')
        return false
    }
    let ok = true
    const _arr = arr.sort()
    const _base = base.sort()
    for (let i = 0; i < arr.length; i++) {
        if (_arr[i] !== _base[i]) {
            console.warn(
                `[WARN] Different value at index [${i}]: ${_arr[i]} !== ${_base[i]}`
            )
            ok = false
        }
    }
    return ok
}

function main() {
    let ok = true

    // check locale existence
    const dirLocales = readdirSync(basedir)
    for (const i of locales) {
        if (!dirLocales.includes(i)) {
            console.warn(`Locale files for '${i}' is not found`)
            ok = false
        }
    }
    if (!ok) {
        return false
    }
    console.log('Locale dir check finished!')

    console.log(`Base locale: ${locales[0]}`)
    // check file list
    const files = locales.map((locale) => readdirSync(join(basedir, locale)))
    for (let i = 1; i < files.length; i++) {
        ok = arrayEq(files[i], files[0])
    }
    if (!ok) {
        return false
    }
    console.log('Locale file check finished!')

    // check line list
    for (let i = 1; i < files[0].length; i++) {
        const filename = files[0][i]
        console.log(`> Checking ${filename}`)
        const lines = locales.map((locale) => [
            join(basedir, locale, filename),
            getFileKeys(join(basedir, locale, filename)),
        ])
        const ifEmpty = lines.find((x) => x[1] === null)
        if (ifEmpty !== undefined) {
            console.warn(`Failed to read ${ifEmpty[0]}, halt`)
            ok = false
            continue
        }
        for (let i = 1; i < lines.length; i++) {
            console.log(`>> Checking ${lines[i][0]} against ${lines[0][0]}`)
            ok = arrayEq(lines[i][1], lines[0][1]) && ok === true
        }
    }
    if (!ok) {
        return false
    }

    return true
}

main() || process.exit(1)
console.log('Locale lines check finished!')
