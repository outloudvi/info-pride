#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

import { got } from 'got'

const __dirname = dirname(new URL(import.meta.url).pathname)

const Transformations = {
    'v-card-name.json': ['/Card', (x) => x.name],
    'v-event-name.json': ['/EventStory/List', (x) => x.description],
}

async function main() {
    await Promise.all(
        Object.entries(Transformations).map(([filename, [apiPath, lambda]]) =>
            (async () => {
                const filePath = join(__dirname, `../locales/ja/${filename}`)
                const items = await got(
                    `https://idoly-backend.outv.im/api${apiPath}`
                ).json()
                let ret = JSON.parse(readFileSync(filePath, 'utf-8'))
                for (const i of items) {
                    const key = lambda(i)
                    ret[key] = key
                }
                writeFileSync(filePath, JSON.stringify(ret, null, 4))
                console.log(`[DONE] ${filename}`)
            })()
        )
    )
}

main()
