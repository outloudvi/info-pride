export function notNull<T>(value: T | null): value is T {
  return value !== null
}

export function notUndefined<T>(value: T | undefined): value is T {
  return value !== undefined
}
