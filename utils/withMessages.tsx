import { pick } from 'lodash'
import { useMessages } from 'next-intl'
import { getMessages } from 'next-intl/server'

import type { AsyncComponent, Component, ParamsWithLocale } from './types'
import { SOURCE_TIMEZONE } from './constants'

import OurIntlClientProvider from '#components/OurIntlClientProvider'

export function withMessages<T>(
    Child: Component<T>,
    parts: string[],
): Component<T & ParamsWithLocale> {
    return function MessagesWrapped(props: T & ParamsWithLocale) {
        const {
            params: { locale },
        } = props
        const allMessages = useMessages()
        const messagesParts = pick(allMessages, ['common', ...parts])

        return (
            <OurIntlClientProvider
                locale={locale}
                timeZone={SOURCE_TIMEZONE}
                now={new Date()}
                messages={messagesParts}
            >
                <Child {...(props as T & JSX.IntrinsicAttributes)} />
            </OurIntlClientProvider>
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
        const allMessages = await getMessages()
        const messagesParts = pick(allMessages, ['common', ...parts])

        return (
            <OurIntlClientProvider
                locale={locale}
                timeZone={SOURCE_TIMEZONE}
                now={new Date()}
                messages={messagesParts}
            >
                <Child {...(props as T & JSX.IntrinsicAttributes)} />
            </OurIntlClientProvider>
        )
    }
}
