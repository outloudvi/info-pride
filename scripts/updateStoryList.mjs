import { readFileSync } from 'node:fs'
import storyPrefix from '../data/storyprefix.json' with { type: "json" }

function findLatest(prefix, ids) {
    const targetIds = ids
        .filter(x => x.startsWith(prefix))
        .map(x => x.slice(prefix.length + 1).split("-"))
        .filter(x => x.length === 2)
        .map(([chapter, episode]) => [Number(chapter), Number(episode)])
        .filter(([a, b]) => !(isNaN(a) || isNaN(b)))
    const chapters = new Set(targetIds.map(([chapter]) => chapter))
    return [...chapters].map((chapter) => targetIds.filter((x) => x[0] === chapter).map(x => x[1]).sort((a, b) => b - a)[0])
}

function main() {
    const storyJsonPath = process.argv[2]

    if (!storyJsonPath) {
        console.error("Usage: node ./updateStoryList.mjs <pathToStoryJson>")
    }
    const story = JSON.parse(readFileSync(storyJsonPath, "utf-8"))
    const ids = story.map(x => x.id)
    const result = {}
    for (const [key, value] of Object.entries(storyPrefix)) {
        const ret = findLatest(value, ids)
        result[key] = ret
    }
    console.log(result)
}

main()