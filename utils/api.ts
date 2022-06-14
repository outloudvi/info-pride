import type { APIMapping } from 'hoshimi-types'
import { UnwrapPromise } from 'hoshimi-types/helpers'

export type UnArray<T> = T extends (infer R)[] ? R : never

export type GetFirst<T extends unknown[]> = T[0]

export type LengthOf<T extends unknown[]> = T['length']

export type APIResponseOf<M extends keyof APIMapping> = UnwrapPromise<
  ReturnType<APIMapping[M]>
>
