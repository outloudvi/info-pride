import * as fs from 'node:fs'
import { dirname, join } from 'node:path'

const __dirname = dirname(new URL(import.meta.url).pathname)

function writeTo(obj, file) {
    const pak = JSON.parse(fs.readFileSync(file, 'utf-8'))
    fs.writeFileSync(
        file,
        JSON.stringify({
            ...pak,
            ...obj,
        })
    )
}

const target = process.argv?.[2] ?? 'mjs'

if (target === 'cjs') {
    writeTo(
        {
            type: undefined,
        },
        join(__dirname, '../package.json')
    )
} else if (target === 'mjs') {
    writeTo(
        {
            type: 'module',
        },
        join(__dirname, '../package.json')
    )
    writeTo(
        {
            'ts-node': {
                esm: true,
            },
        },
        join(__dirname, '../tsconfig.json')
    )
}
