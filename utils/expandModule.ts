export default function expandModule(
    item: Record<string, any>,
): Record<string, any> {
    const result = {}
    for (let [key, value] of Object.entries(item)) {
        result[key] = value
    }
    return result
}
