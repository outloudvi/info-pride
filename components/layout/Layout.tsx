import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { AppShell } from '@mantine/core'
import { atom, useAtom } from 'jotai'
import { useRouter } from 'next/router'

import AppHeader from './AppHeader'
import AppNavBar from './AppNavBar'
import Footer from './Footer'

import Year2Anniv from '#components/Year2Anniv'

const expandedNavbarAtom = atom(false)

const Layout = ({ children }: { children: ReactNode }) => {
    const [expandedNavbar, setExpandedNavbar] = useAtom(expandedNavbarAtom)
    const router = useRouter()

    useEffect(() => {
        const maybeCollapseNavbar = () => {
            // sm: The sidebar will go full-screen
            if (window.innerWidth <= 640) {
                setExpandedNavbar(false)
            }
        }
        router.events.on('routeChangeComplete', maybeCollapseNavbar)
        return () => {
            router.events.off('routeChangeComplete', maybeCollapseNavbar)
        }
    }, [router.events, setExpandedNavbar])

    return (
        <>
            <Year2Anniv />
            <AppShell
                fixed={false}
                navbar={<AppNavBar expanded={expandedNavbar} />}
                header={
                    <AppHeader
                        navBarOpened={expandedNavbar}
                        toggleNavBar={() => {
                            setExpandedNavbar(!expandedNavbar)
                        }}
                    />
                }
                classNames={{
                    main:
                        (expandedNavbar ? 'hidden sm:block' : '') +
                        ' overflow-y-auto',
                }}
                sx={(theme) => ({
                    main: {
                        backgroundColor:
                            theme.colorScheme === 'dark'
                                ? theme.colors.dark[8]
                                : theme.colors.gray[0],
                        maxHeight: 'calc(100vh - 60px)',
                        overflowY: 'scroll',
                    },
                })}
            >
                {children}
                <Footer />
            </AppShell>
        </>
    )
}

export default Layout
