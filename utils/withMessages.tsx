import type { JSX } from 'react'

import { pick } from 'lodash'
import { getMessages, unstable_setRequestLocale } from 'next-intl/server'

import type { AsyncComponent, Component, ParamsWithLocale } from './types'
import { SOURCE_TIMEZONE } from './constants'

import OurIntlClientProvider from '#components/OurIntlClientProvider'

export function withMessages<T>(
    Child: Component<T>,
    parts: string[],
): AsyncComponent<T & ParamsWithLocale> {
    return async function MessagesWrapped(props: T & ParamsWithLocale) {
        const { locale } = await props.params
        unstable_setRequestLocale(locale)
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

export const withAsyncMessages = withMessages
