import { ReactNode, useEffect } from 'react'
import { AppShell } from '@mantine/core'
import { atom, useAtom } from 'jotai'
import { useRouter } from 'next/router'

import AppHeader from './AppHeader'
import AppNavBar from './AppNavBar'
import Footer from './Footer'

import Paths from '#utils/paths'

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
        console.log('setting up route')
        router.events.on('routeChangeComplete', maybeCollapseNavbar)
        return () => {
            router.events.off('routeChangeComplete', maybeCollapseNavbar)
        }
    })

    return (
        <>
            <AppShell
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

                        backgroundImage: `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url('${Paths.sprite(
                            'ip_bg'
                        )}')`,
                        backgroundSize: '122px 177px', // half
                        animationName: 'bg-anim',
                        animationDuration: '10s',
                        animationTimingFunction: 'linear',
                        animationIterationCount: 'infinite',
                        '@keyframes bg-anim': {
                            from: {
                                backgroundPosition: '0 0',
                            },
                            to: {
                                backgroundPosition: '244px 354px',
                            },
                        },
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
