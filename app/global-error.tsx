// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#react-render-errors-in-app-router

'use client'

import * as Sentry from '@sentry/nextjs'
import NextError from 'next/error'
import { useEffect } from 'react'

export default function GlobalError({
    error,
}: {
    error: Error & { digest?: string }
}) {
    useEffect(() => {
        Sentry.captureException(error)
    }, [error])

    return (
        <html>
            <body>
                {/* @ts-expect-error: This is the default Next.js error component but it doesn't allow omitting the statusCode property yet. */}
                <NextError statusCode={undefined} />
            </body>
        </html>
    )
}
