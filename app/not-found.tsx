import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function Custom404() {
    const $t = useTranslations('404')
    return (
        <html>
            <head>
                <title>404 | INFO PRIDE</title>
                <link rel="shortcut icon" href="/favicon.svg" />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </head>
            <body>
                <div
                    style={{
                        textAlign: 'center',
                    }}
                >
                    <h1>404 - {$t('title')}</h1>
                    <p>
                        <Link href="/">{$t('back_to_main_page')}</Link>
                    </p>
                    <p>
                        INFO PRIDE |{' '}
                        <a href="https://github.com/outloudvi/info-pride/issues">
                            {$t('bug_report')}
                        </a>
                    </p>
                </div>
            </body>
        </html>
    )
}
