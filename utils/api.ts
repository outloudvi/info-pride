import type { AcceptableKey, APIMapping } from '@outloudvi/hoshimi-types'

export function fetchDb<C extends AcceptableKey>(path: C): APIMapping[C] {
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

export type UnwrapPromise<T> = T extends Promise<infer U> ? U : never
