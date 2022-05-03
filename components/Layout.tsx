import { ReactNode, useState } from 'react'
import { AppShell } from '@mantine/core'

import Footer from '../components/Footer'

import AppHeader from './AppHeader'
import AppNavBar from './AppNavBar'

const Layout = ({ children }: { children: ReactNode }) => {
  const [expandedNavbar, setExpandedNavbar] = useState(false)

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
          main: (expandedNavbar ? 'hidden sm:block' : '') + ' overflow-y-auto',
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
        {typeof window === 'undefined' ? null : children}
        <Footer />
      </AppShell>
    </>
  )
}

export default Layout
