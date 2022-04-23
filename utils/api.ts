import type { AcceptableApiPath, APIMapping } from '@outloudvi/hoshimi-types'

export function fetchDb<C extends AcceptableApiPath>(path: C): APIMapping[C] {
  return (...args: any[]) => {
    const url = new URL('https://idoly-backend.outv.im/api/' + path)

    if (args.length > 0) {
      for (const [k, v] of Object.entries(args[0])) {
        url.searchParams.set(k, String(v))
      }
    }
    return fetch(String(url)).then((x) => x.json())
  }
}

export type UnArray<T> = T extends (infer R)[] ? R : never
