export type Component<T> = (args: T) => JSX.Element

export type AsyncComponent<T> = (args: T) => Promise<JSX.Element>
