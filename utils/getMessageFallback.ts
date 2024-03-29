import type { IntlError } from 'next-intl'
import { IntlErrorCode } from 'next-intl'
import * as Sentry from '@sentry/browser'

export default function getMessageFallback({
    key,
    error,
}: {
    error: IntlError
    key: string
    namespace?: string
}): string {
    if (error.code !== IntlErrorCode.MISSING_MESSAGE) {
        Sentry.captureException(error)
    }
    return key
}

export function onError(error: IntlError) {
    if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        if (error.originalMessage?.includes('`v-')) {
            // ignore vendor-related strings
            Sentry.captureException(error)
            return
        }
        console.error(error)
    } else {
        Sentry.captureException(error)
    }
}
