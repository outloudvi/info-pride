import { readFileSync, writeFileSync } from 'node:fs'

import got from 'got'

async function main() {
  const currentCcid = JSON.parse(readFileSync('./ccid.json'))
  const ccid = await got('https://idoly-backend.outv.im/api/Card/Id').json()
  for (const [charId, ccidItems] of Object.entries(ccid)) {
    for (const i of ccidItems) {
      // for new charId, accept ccid from remote
      if (
        currentCcid[charId].filter((x) => x.charId === i.charId).length === 0
      ) {
        console.log(`Adding ${i.nameJa} to ${i.charId}/${i.ccid}`)
        currentCcid[charId].push(i)
      }
    }
  }
  writeFileSync('./ccid.json', JSON.stringify(currentCcid))
}

main()