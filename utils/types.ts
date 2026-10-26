import type { JSX } from 'react'

export type Component<T> = (args: T) => JSX.Element | Promise<JSX.Element>

export type AsyncComponent<T> = (args: T) => Promise<JSX.Element>

export type ParamsWithLocale = {
    // Next.js 15 exposes dynamic route params as a Promise.
    params: Promise<{ locale: string }>
}

export type BackendError = {
    ok: false
    message: string
}
