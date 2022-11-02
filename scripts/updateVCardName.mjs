#!/usr/bin/env node
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

import { got } from 'got'

const __dirname = dirname(new URL(import.meta.url).pathname)

async function main() {
    const cards = await got('https://idoly-backend.outv.im/api/Card').json()
    const ret = {}
    for (const i of cards) {
        ret[i.name] = i.name
    }

    writeFileSync(
        join(__dirname, '../locales/ja/v-card-name.json'),
        JSON.stringify(ret, null, 4)
    )
}

main()
