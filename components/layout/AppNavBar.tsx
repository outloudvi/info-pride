import Link from 'next/link'
import { Navbar, UnstyledButton } from '@mantine/core'
import { useTranslations } from 'next-intl'

import LanguageSelection from './LanguageSelection'

import Pages from '#data/pages'

const AppNavBar = ({ expanded }: { expanded: boolean }) => {
    const $t = useTranslations('common.sidebar')

    return (
        <Navbar
            className={
                (expanded ? 'w-screen sm:w-48 lg:w-64' : '') +
                ' overflow-hidden '
            }
            style={{
                transition: 'width 0.2s ease-out',
                ...(!expanded ? { width: 0 } : {}),
            }}
            width={{ base: 200 }}
            height={'calc(100vh - 60px)'}
        >
            {Object.entries(Pages).map(([k, v], key) => (
                <Navbar.Section key={key}>
                    <Link href={v} passHref>
                        <a>
                            <UnstyledButton className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded w-full px-2 py-2 whitespace-nowrap">
                                {$t(k)}
                            </UnstyledButton>
                        </a>
                    </Link>
                </Navbar.Section>
            ))}
            <Navbar.Section className="mt-2 mx-2 md:hidden">
                <LanguageSelection />
            </Navbar.Section>
        </Navbar>
    )
}

export default AppNavBar
