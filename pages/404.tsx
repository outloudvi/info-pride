import Link from 'next/link'

import getI18nProps from '#utils/getI18nProps'

export default function Custom404() {
    return (
        <div className="text-center">
            <h1>404 - Page Not Found</h1>
            <p>
                <Link href="/">Get back to main page.</Link>
            </p>
            <p>
                INFO PRIDE |{' '}
                <a href="https://github.com/outloudvi/info-pride/issues">
                    Report bugs
                </a>
            </p>
        </div>
    )
}

export const getStaticProps = getI18nProps()
