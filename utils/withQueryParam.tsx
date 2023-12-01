import { QueryParamProvider } from 'use-query-params'
import NextAdapterApp from 'next-query-params/app'

type Component<T> = (args: T) => JSX.Element

function withQueryParam<T>(Chlid: Component<T>): Component<T> {
    return function QueryParamWrapped(props: T) {
        return (
            <QueryParamProvider adapter={NextAdapterApp}>
                <Chlid {...(props as T & JSX.IntrinsicAttributes)} />
            </QueryParamProvider>
        )
    }
}

export default withQueryParam
