function tryJSONParse(s: unknown): unknown | null {
    try {
        return JSON.parse(String(s))
    } catch (_) {
        return null
    }
}

export default tryJSONParse
