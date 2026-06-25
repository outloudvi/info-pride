import type { APIMapping } from 'hoshimi-types'

import type { APIResponseOf, GetFirst, LengthOf } from './api'
import Paths from './paths'

export function fetchApi<T extends keyof APIMapping>(
    key: T,
    params?: LengthOf<Parameters<APIMapping[T]>> extends 0
        ? undefined
        : GetFirst<Parameters<APIMapping[T]>>,
): Promise<APIResponseOf<T>> {
    const url = new URL(Paths.api(key))
    Object.entries(params ?? {}).map(([k, v]) => {
        url.searchParams.set(k, String(v))
    })

    return fetch(String(url), {
        next: { revalidate: 3600 },
    }).then((res) => res.json())
}
