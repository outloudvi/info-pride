import { pick } from 'lodash'
import { NextIntlClientProvider, useMessages } from 'next-intl'

import type { Component } from './types'

function withMessages<T>(Child: Component<T>, parts: string[]): Component<T> {
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

export default withMessages
