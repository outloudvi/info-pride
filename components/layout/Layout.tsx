import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { AppShell, useMantineColorScheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import AppHeader from './AppHeader'
import AppNavBar from './AppNavBar'
import Footer from './Footer'

import startupHook from '#utils/startupHook'

const Layout = ({ children }: { children: ReactNode }) => {
    const [navbarOpened, { toggle }] = useDisclosure()

    const { setColorScheme } = useMantineColorScheme()
    useEffect(() => {
        startupHook(setColorScheme)
    }, [setColorScheme])

    return (
        <>
            <AppShell
                header={{ height: 60 }}
                navbar={{
                    width: 200,
                    breakpoint: 'sm',
                    collapsed: {
                        desktop: !navbarOpened,
                        mobile: !navbarOpened,
                    },
                }}
                padding="md"
                style={{
                    main: {
                        backgroundColor: `light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-8))`,
                        maxHeight: 'calc(100vh - 60px)',
                        overflowY: 'scroll',
                    },
                }}
            >
                <AppShell.Header>
                    <AppHeader
                        navBarOpened={navbarOpened}
                        toggleNavBar={toggle}
                    />
                </AppShell.Header>
                <AppShell.Navbar>
                    <AppNavBar />
                </AppShell.Navbar>
                <AppShell.Main>
                    {children}
                    <Footer />
                </AppShell.Main>
            </AppShell>
        </>
    )
}

export default Layout
