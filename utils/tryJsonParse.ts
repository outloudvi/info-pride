function tryJSONParse(s: any): any {
  try {
    return JSON.parse(s)
  } catch (_) {
    return {}
  }
}

export default tryJSONParse
