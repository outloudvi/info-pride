#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

const __dirname = dirname(new URL(import.meta.url).pathname)

const Transformations = {
    'v-card-alias.json': ['/Card', (x) => [x.assetId, x.name]],
    'v-card-name.json': ['/Card', (x) => [x.name, x.name]],
    'v-event-name.json': ['/EventStory/List', (x) => [x.description, x.description]],
    'v-chr.json': ['/Character/List', (x) => [x.id, x.name]],
}

async function main() {
    await Promise.all(
        Object.entries(Transformations).map(([filename, [apiPath, lambda]]) =>
            (async () => {
                const filePath = join(__dirname, `../locales/ja/${filename}`)
                const items = await fetch(
                    `https://idoly-backend.outv.im/api${apiPath}`,
                ).then((x) => x.json())
                let ret = JSON.parse(readFileSync(filePath, 'utf-8'))
                for (const i of items) {
                    const [key, value] = lambda(i)
                    const escapedKey = $tp(key)
                    if (!ret[escapedKey]) {
                        ret[escapedKey] = value
                    }
                }
                if (ret[""] !== undefined) {
                    delete ret[""]
                }
                writeFileSync(filePath, JSON.stringify(ret, null, 4))
                console.log(`[DONE] ${filename}`)
            })(),
        ),
    )
}

// sync with utils/transProtect.ts
function $tp(x) {
    return x.replaceAll('.', '__')
}

main()
