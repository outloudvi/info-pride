import type { APIMapping } from 'hoshimi-types'

import type { APIResponseOf, GetFirst, LengthOf } from './api'
import Paths from './paths'

export function fetchApi<T extends keyof APIMapping>(
    key: T,
    params?: LengthOf<Parameters<APIMapping[T]>> extends 0
        ? undefined
        : GetFirst<Parameters<APIMapping[T]>>,
): Promise<APIResponseOf<T>> {
    const urlsp = new URLSearchParams()
    let withParams = false
    Object.entries(params ?? {}).map(([k, v]) => {
        withParams = true
        urlsp.set(k, String(v))
    })

    return fetch(
        Paths.api(key) + (withParams ? '?' + urlsp.toString() : ''),
        {},
    ).then((res) => res.json())
}
