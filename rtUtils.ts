// Runtime utilities

export function tryToNumber(n: string | string[] | undefined): number | null {
  if (n === undefined) return null
  if (Array.isArray(n)) return tryToNumber(n[0])
  return Number.isNaN(Number(n)) ? null : Number(n)
}

export function updateRoute(path: string) {
  window.history.replaceState(
    {
      ...window.history.state,
      as: path,
    },
    '',
    path
  )
}
