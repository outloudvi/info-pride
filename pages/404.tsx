import Link from 'next/link'
import { useTranslations } from 'next-intl'

import getI18nProps from '#utils/getI18nProps'

export default function Custom404() {
    const $t = useTranslations('404')
    return (
        <div className="text-center">
            <h1>404 - {$t('title')}</h1>
            <p>
                <Link href="/">{$t('back_to_main_page')}</Link>
            </p>
            <p>
                SATOMI PRIDE |{' '}
                <a href="https://github.com/outloudvi/info-pride/issues">
                    {$t('bug_report')}
                </a>
            </p>
        </div>
    )
}

export const getStaticProps = getI18nProps(['404'])
