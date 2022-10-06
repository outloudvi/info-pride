import { QueryParamProvider } from 'use-query-params'
import { NextAdapter } from 'next-query-params'

type Component<T> = (args: T) => JSX.Element

function withQueryParam<T>(Chlid: Component<T>): Component<T> {
    return function QueryParamWrapped(props: T) {
        return (
            <QueryParamProvider adapter={NextAdapter}>
                <Chlid {...(props as T & JSX.IntrinsicAttributes)} />
            </QueryParamProvider>
        )
    }
}

export default withQueryParam
