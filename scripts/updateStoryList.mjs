import { writeFileSync } from 'node:fs'
import storyPrefix from '../data/storyprefix.json' with { type: "json" }

const STORY_JSON = "https://github.com/MalitsPlus/ipr-master-diff/raw/refs/heads/main/Story.json"

function toSequenceNotation(nums) {
    const sorted = [...new Set(nums)].sort((a, b) => a - b)
    if (sorted.length === 0) return ''
    const parts = []
    let start = sorted[0]
    let prev = sorted[0]
    for (let i = 1; i <= sorted.length; i++) {
        const cur = sorted[i]
        if (cur === prev + 1) {
            prev = cur
        } else {
            parts.push(start === prev ? String(start) : `${start}-${prev}`)
            start = cur
            prev = cur
        }
    }
    return parts.join(',')
}

function findAll(prefix, ids) {
    const targetIds = ids
        .filter(x => x.startsWith(prefix))
        .map(x => x.slice(prefix.length + 1).split("-"))
        .filter(x => x.length === 2)
        .map(([chapter, episode]) => [Number(chapter), Number(episode)])
        .filter(([a, b]) => !(isNaN(a) || isNaN(b)))
    const chapters = new Set(targetIds.map(([chapter]) => chapter))
    return [...chapters].sort((a, b) => a - b).map((chapter) =>
        toSequenceNotation(targetIds.filter((x) => x[0] === chapter).map(x => x[1]))
    )
}

async function main() {
    const story = await fetch(STORY_JSON).then(x=>x.json())
    const ids = story.map(x => x.id)
    const result = {}
    for (const [key, value] of Object.entries(storyPrefix)) {
        const ret = findAll(value, ids)
        result[key] = ret
    }
    writeFileSync("data/stories.json", JSON.stringify(result, null, 4))
}

main()