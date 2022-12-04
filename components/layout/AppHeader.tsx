import * as React from 'react'
import Link from 'next/link'
import { Burger, Button, Header, useMantineColorScheme } from '@mantine/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBell,
    faMoon,
    faSun,
    faTree,
} from '@fortawesome/free-solid-svg-icons'
import { useCallback, useEffect } from 'react'
import { useTranslations } from 'next-intl'

import LanguageSelection from './LanguageSelection'

const AppHeader = ({
    navBarOpened,
    toggleNavBar,
}: {
    navBarOpened: boolean
    toggleNavBar: () => void
}) => {
    const $t = useTranslations('common')
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()

    const updateTailwindDarkMode = useCallback(() => {
        if (colorScheme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [colorScheme])

    useEffect(() => {
        updateTailwindDarkMode()
    })

    const toggleColorSchemeWithTailwind = useCallback(() => {
        updateTailwindDarkMode()
        toggleColorScheme()
    }, [updateTailwindDarkMode, toggleColorScheme])

    const title = navBarOpened ? 'Collapse navigation' : 'Expand navigation'
    return (
        <Header height={60} p="xs" className="flex items-center">
            <Burger
                opened={navBarOpened}
                onClick={toggleNavBar}
                title={title}
                aria-label={title}
            />
            <Link
                href="/"
                className="text-black dark:text-white no-underline hover:underline ml-2"
            >
                <b>INFO PRIDE</b>
            </Link>
            <div className="grow text-center">
                <div className="hidden md:block">
                    <FontAwesomeIcon
                        icon={faTree}
                        color="green"
                        className="h-4"
                    />
                    <FontAwesomeIcon
                        icon={faBell}
                        color="gold"
                        className="h-4"
                    />
                    <span
                        className="mx-2 font-semibold"
                        style={{
                            background: 'linear-gradient(#74D680, #FF7878)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            letterSpacing: '1.1px',
                        }}
                    >
                        {$t('1205_merry_christmas')}
                    </span>
                    <FontAwesomeIcon
                        icon={faBell}
                        color="gold"
                        className="h-4"
                    />
                    <FontAwesomeIcon
                        icon={faTree}
                        color="green"
                        className="h-4"
                    />
                </div>
            </div>
            <LanguageSelection className="hidden md:block" />
            <Button onClick={() => toggleColorSchemeWithTailwind()}>
                <FontAwesomeIcon
                    className="mr-1"
                    icon={colorScheme === 'dark' ? faSun : faMoon}
                />{' '}
                {$t('Switch theme')}
            </Button>
        </Header>
    )
}

export default AppHeader
