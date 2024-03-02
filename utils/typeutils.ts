export type UnsafeSearchParams<T> = {
    [key in keyof T]: string | string[] | undefined
}
