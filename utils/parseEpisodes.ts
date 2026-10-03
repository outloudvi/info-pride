import { range } from 'lodash'

export default function parseEpisodes(notation: string): number[] {
    if (!notation) return []
    const result: number[] = []
    for (const part of notation.split(',')) {
        const trimmed = part.trim()
        if (!trimmed) continue
        const [startEp, endEp] = part.split("-")
        if (endEp) {
            const start = Number(startEp)
            const end = Number(endEp)
            result.push(...range(start, end + 1))
        } else {
            const num = Number(trimmed)
            if (!isNaN(num)) {
                result.push(num)
            }
        }
    }
    return result
}