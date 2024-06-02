'use client'

import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { AppShell, useMantineColorScheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { QueryClient, QueryClientProvider } from 'react-query'
import NextNProgress from 'nextjs-progressbar'

import AppHeader from './AppHeader'
import AppNavBar from './AppNavBar'
import Footer from './Footer'

import startupHook from '#utils/startupHook'
import Paths from '#utils/paths'

const Layout = ({ children }: { children: ReactNode }) => {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: Infinity,
                        queryFn: ({ queryKey: [path] }) => {
                            if (typeof path === 'string') {
                                const url = new URL(Paths.api(path))
                                return fetch(String(url)).then((x) => x.json())
                            }
                            throw new Error('Invalid QueryKey')
                        },
                    },
                },
            }),
    )

    const [navbarOpened, { toggle }] = useDisclosure()

    const { setColorScheme } = useMantineColorScheme()
    useEffect(() => {
        startupHook(setColorScheme)
    }, [setColorScheme])

    return (
        <>
            <NextNProgress />
            <QueryClientProvider client={queryClient}>
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
            </QueryClientProvider>
        </>
    )
}

export default Layout
