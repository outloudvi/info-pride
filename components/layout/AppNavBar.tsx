import { useTranslations } from 'next-intl'

import LanguageSelection from './LanguageSelection'

import { Link } from '#utils/navigation'
import Pages from '#data/pages'

const AppNavBar = () => {
    const $t = useTranslations('common.sidebar')

    return (
        <div
            className="w-full overflow-y-auto"
            style={{
                transition: 'width 0.2s ease-out',
                height: 'calc(100vh - 60px)',
            }}
        >
            {Object.entries(Pages).map(([k, v], key) => (
                <Link key={key} href={v} className="nostyle">
                    <div className="hover:bg-gray-200 dark:hover:bg-gray-700 px-2 py-1">
                        {$t(k)}
                    </div>
                </Link>
            ))}
            <div className="mt-2 mx-2 md:hidden">
                <LanguageSelection />
            </div>
        </div>
    )
}

export default AppNavBar
