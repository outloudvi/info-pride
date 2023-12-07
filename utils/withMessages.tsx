import { pick } from 'lodash'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { getMessages } from 'next-intl/server'

import type { AsyncComponent, Component } from './types'

export function withMessages<T>(
    Child: Component<T>,
    parts: string[],
): Component<T> {
    return function MessagesWrapped(props: T) {
        const allMessages = useMessages()
        const messagesParts = pick(allMessages, ['common', ...parts])

        return (
            <NextIntlClientProvider messages={messagesParts}>
                <Child {...(props as T & JSX.IntrinsicAttributes)} />
            </NextIntlClientProvider>
        )
    }
}

export function withAsyncMessages<T>(
    Child: AsyncComponent<T>,
    parts: string[],
): AsyncComponent<T> {
    return async function MessagesWrapped(props: T) {
        const allMessages = await getMessages()
        const messagesParts = pick(allMessages, ['common', ...parts])

        return (
            <NextIntlClientProvider messages={messagesParts}>
                <Child {...(props as T & JSX.IntrinsicAttributes)} />
            </NextIntlClientProvider>
        )
    }
}
