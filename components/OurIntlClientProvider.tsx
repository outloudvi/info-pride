'use client'

import { NextIntlClientProvider } from 'next-intl'

import getMessageFallback, { onError } from '#utils/getMessageFallback'

export default function OurIntlClientProvider({
    locale,
    timeZone,
    now,
    ...rest
}: Parameters<typeof NextIntlClientProvider>[0]) {
    return (
        <NextIntlClientProvider
            getMessageFallback={getMessageFallback}
            onError={onError}
            locale={locale}
            timeZone={timeZone}
            now={now}
            {...rest}
        />
    )
}
