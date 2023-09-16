// https://stackoverflow.com/questions/53050011/remove-null-or-undefined-from-properties-of-a-type
type NoUndefinedField<T> = {
    [P in keyof T]-?: NonNullable<T[P]>
}

function allFinished<R extends Record<string, any>>(
    r: R,
): r is NoUndefinedField<R> {
    return Object.values(r).filter((x) => x === undefined).length === 0
}

export default allFinished
