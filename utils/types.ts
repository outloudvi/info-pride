export type Component<T> = (args: T) => JSX.Element

export type AsyncComponent<T> = (args: T) => Promise<JSX.Element>

export type ParamsWithLocale = {
    params: { locale: string }
}

export type BackendError = {
    ok: false
    message: string
}
