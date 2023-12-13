import { pick } from 'lodash'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { getMessages, unstable_setRequestLocale } from 'next-intl/server'

import type { AsyncComponent, Component, ParamsWithLocale } from './types'

export function withMessages<T>(
    Child: Component<T>,
    parts: string[],
): Component<T & ParamsWithLocale> {
    return function MessagesWrapped(props: T & ParamsWithLocale) {
        const {
            params: { locale },
        } = props
        unstable_setRequestLocale(locale)
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
): AsyncComponent<T & ParamsWithLocale> {
    return async function MessagesWrapped(props: T & ParamsWithLocale) {
        const {
            params: { locale },
        } = props
        unstable_setRequestLocale(locale)
        const allMessages = await getMessages()
        const messagesParts = pick(allMessages, ['common', ...parts])

        return (
            <NextIntlClientProvider messages={messagesParts}>
                <Child {...(props as T & JSX.IntrinsicAttributes)} />
            </NextIntlClientProvider>
        )
    }
}
