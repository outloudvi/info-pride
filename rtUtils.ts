// Runtime utilities

export function tryToNumber(n: string | string[] | undefined): number | null {
  if (n === undefined) return null
  if (Array.isArray(n)) return tryToNumber(n[0])
  return Number.isNaN(Number(n)) ? null : Number(n)
}

export function tryToFirst(
  n: string | string[] | undefined
): string | undefined {
  if (n === undefined) {
    return undefined
  }
  if (Array.isArray(n)) return n[0]
  return n
}

export function tryJSONParse(s: any): any {
  try {
    return JSON.parse(s)
  } catch (_) {
    return {}
  }
}
