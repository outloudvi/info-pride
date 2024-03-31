'use client'

import * as React from 'react'
import { Burger, Button, useMantineColorScheme } from '@mantine/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { useCallback, useEffect } from 'react'
import { useTranslations } from 'next-intl'

import LanguageSelection from './LanguageSelection'

import { Link } from '#utils/navigation'

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
        <div className="flex p-3 items-center">
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
                <b>GYOGYO PRIDE</b>
            </Link>
            <div className="grow"></div>
            <LanguageSelection className="hidden md:block" />
            <Button onClick={() => toggleColorSchemeWithTailwind()}>
                <FontAwesomeIcon
                    className="mr-1"
                    icon={colorScheme === 'dark' ? faSun : faMoon}
                />{' '}
                {$t('Switch theme')}
            </Button>
        </div>
    )
}

export default AppHeader
