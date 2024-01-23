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
