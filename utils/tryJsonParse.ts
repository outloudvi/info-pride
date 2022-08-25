function tryJSONParse(s: any): any | null {
    try {
        return JSON.parse(s)
    } catch (_) {
        return null
    }
}

export default tryJSONParse
