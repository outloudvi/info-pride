'use client'

import { useTranslations } from 'next-intl'

const TestTwo = () => {
    const $t = useTranslations('404')
    const $c = useTranslations('common')
    return (
        <ul>
            <li>Client Component: {$t('back_to_main_page')}</li>
            <li>Client Component (Common): {$c('Switch theme')}</li>
        </ul>
    )
}

export default TestTwo
