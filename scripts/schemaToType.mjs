#!/usr/bin/env node

import { readdirSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

import { compileFromFile } from 'json-schema-to-typescript'

function main() {
  const currDir = fileURLToPath(dirname(import.meta.url))
  const subPath = join(currDir, process.argv[2])
  console.info(`Scanning: ${subPath}`)
  const schemaFiles = readdirSync(subPath).filter((x) =>
    x.endsWith('.schema.json')
  )

  for (const i of schemaFiles) {
    console.info(`Processing: ${i}`)
    compileFromFile(join(subPath, i)).then((ts) =>
      writeFileSync(join(subPath, i.replace(/\.schema\.json$/, '.d.ts')), ts)
    )
  }
}

main()
