import Link from 'next/link'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

const Custom404 = async () => {
    // FIXME: detect the locale on-the-fly
    unstable_setRequestLocale('zh-Hans')
    const $t = await getTranslations('404')
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

export default Custom404
