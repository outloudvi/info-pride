#!/usr/bin/env node

import { readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { compileFromFile } from 'json-schema-to-typescript'

function main() {
    const subPath = process.argv[2]
    console.info(`Scanning: ${subPath}`)
    const schemaFiles = readdirSync(subPath).filter((x) =>
        x.endsWith('.schema.json')
    )

    for (const i of schemaFiles) {
        console.info(`Processing: ${i}`)
        compileFromFile(join(subPath, i)).then((ts) =>
            writeFileSync(
                join(subPath, i.replace(/\.schema\.json$/, '.d.ts')),
                ts
            )
        )
    }
}

main()
