import { useLocale, useTranslations } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'

import TestTwo from '#components/i18ntest/ClientTests'
import type { ParamsWithLocale } from '#utils/types'
import { withMessages } from '#utils/withMessages'

const I18nTestPage = ({ params: { locale } }: ParamsWithLocale) => {
    unstable_setRequestLocale(locale)
    const actualLocale = useLocale()
    const $t = useTranslations('404')
    const $c = useTranslations('common')

    return (
        <>
            <h1>i18n status panel</h1>
            <small>
                {"* this page is in English and not translated - that's normal"}
            </small>
            <ul>
                <li>Page locale: {locale}</li>
                <li>Actual locale: {actualLocale}</li>
                <li>
                    Page locale == Actual locale:{' '}
                    <span
                        className={
                            locale === actualLocale
                                ? 'bg-green-400'
                                : 'bg-red-400'
                        }
                    >
                        {String(locale === actualLocale)}
                    </span>
                </li>
            </ul>
            <p>Check if these items match your locale:</p>
            <ul>
                <li>Server Component: {$t('back_to_main_page')}</li>
                <li>Server Component (Common): {$c('Switch theme')}</li>
            </ul>
            <TestTwo />
        </>
    )
}

export default withMessages(I18nTestPage, ['404'])
